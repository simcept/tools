<template>
  <v-container id="apps--pastebin" fill-height>
    <FullPageLoader :isLoading="isLoading" />

    <v-snackbar
      v-model="showHint"
      color="#f5f5f5"
      :timeout="4000"
      light
      top
      right
    >
      <span class="pink--text">{{ hint }}</span>
    </v-snackbar>
    <v-layout align-center justify-center>
      <v-flex xs12 md10>
        <v-card tile class="mb-3">
          <v-form
            @submit.prevent="createOrLoadPastebin"
            v-model="pastebinIDForm"
            id="pastebin-id"
          >
            <v-container>
              <v-layout wrap>
                <v-flex xs12 sm8 lg9>
                  <v-text-field
                    v-model="pastebinID"
                    :rules="pastebinIDRules"
                    @keyup="pastebinDoc = null"
                    counter="30"
                    label="Pastebin ID | Leave this empty to generate a random one."
                    validate-on-blur
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 lg3>
                  <v-btn type="submit" color="primary" block
                    >Create / Load</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>

        <v-card v-if="pastebinDoc" tile>
          <v-form
            @submit.prevent="savePastebin"
            v-model="pastebinContentForm"
            id="pastebin-content"
            ref="pastebinContentForm"
          >
            <v-container grid-list-md>
              <v-layout>
                <v-flex xs12>
                  <v-textarea
                    v-model="pastebinContent"
                    :rules="pastebinContentRules"
                    id="pastebin-content-textarea"
                    counter="100000"
                    rows="20"
                    label="Type anything here."
                    validate-on-blur
                    required
                  ></v-textarea>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12>
                  <v-checkbox
                    v-model="pastebinAgreement"
                    :rules="pastebinAgreementRules"
                    label="I understand and agree that the above content will be
                      uploaded to the cloud and become publicly accessible —
                      anyone could read the content without my further consent."
                    required
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-btn type="submit" color="primary" block>Save</v-btn>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-btn id="pastebin-copy-url" color="secondary" block>
                    Copy URL
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-btn
                    id="pastebin-copy-content"
                    color="secondary"
                    block
                    data-clipboard-target="#pastebin-content-textarea"
                  >
                    Copy Content
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
#pastebin-content-textarea {
  font-family: Ubuntu Mono, Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>

<script>
import ClipboardJS from 'clipboard'
import FullPageLoader from '@/components/FullPageLoader'

const CONTENT_LIMIT = 100000

export default {
  components: {
    FullPageLoader
  },

  data() {
    return {
      isLoading: false,

      showHint: false,
      hint: '',

      pastebinIDForm: null,
      pastebinContentForm: null,
      pastebinCopyURL: null,
      pastebinCopyContent: null,
      pastebinDoc: null,

      pastebinID: '',
      pastebinIDRules: [
        (v) =>
          !v.length ||
          (v.length >= 7 && v.length <= 30) ||
          'Must consist of 7 to 30 characters.',
        (v) => !/[^a-z0-9-]/.test(v) || 'Must only contain a-z, 0-9 and hyphen.'
      ],

      pastebinContent: '',
      pastebinContentRules: [
        (v) => !!v.length || 'Must not be empty.',
        (v) =>
          v.length < CONTENT_LIMIT || 'Must be less than 100,000 characters.'
      ],

      pastebinAgreement: false,
      pastebinAgreementRules: [
        (v) => v || 'You must agree the terms before saving the Pastebin.'
      ]
    }
  },

  mounted() {
    /**
     * Setup the Clipboards
     */

    this.pastebinCopyURL = new ClipboardJS('#pastebin-copy-url', {
      text: () => {
        let url = `${window.location.protocol}//${window.location.host}`
        url += this.$route.path
        url += `?id=${this.pastebinID}`
        return url
      }
    })
    this.pastebinCopyURL.on('success', () => this.alert('Copied the URL!'))

    this.pastebinCopyContent = new ClipboardJS('#pastebin-copy-content')
    this.pastebinCopyContent.on('success', () =>
      this.alert('Copied the content!')
    )

    /**
     * Load the Pastebin
     */

    const id = this.$route.query.id
    if (id) {
      this.pastebinID = id
      this.loadPastebin()
    }
  },

  beforeDestroy() {
    this.pastebinCopyURL.destroy()
    this.pastebinCopyContent.destroy()
  },

  methods: {
    alert(message) {
      this.hint = message
      this.showHint = true
    },

    getPastebinDoc(id) {
      if (!id) {
        throw new Error('Please provide a valid Pastebin ID.')
      }
      return this.$fireStore
        .collection('pastebin')
        .doc(id)
        .get()
    },

    savePastebinDoc(doc, content) {
      content = content.trim()

      if (!content) {
        throw new Error('The Pastebin content must not be empty.')
      }

      if (content.length > CONTENT_LIMIT) {
        throw new Error(
          `The Pastebin content must not have more than ${CONTENT_LIMIT} characters.`
        )
      }

      const now = this.$fireStoreObj.FieldValue.serverTimestamp()
      const data = Object.assign({ createdAt: now }, doc.data(), {
        updatedAt: now,
        content: content.trim()
      })
      return this.$fireStore
        .collection('pastebin')
        .doc(doc.id)
        .set(data)
    },

    async createOrLoadPastebinDoc(id = '') {
      let doc

      id = id.trim()

      // Create the ID.
      if (!id) {
        const characters = '023456789abcedfghijkmnopqrstuvwxyz'
        do {
          id = ''
          for (let i = 0; i < 7; i++) {
            id += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          doc = await this.getPastebinDoc(id)
        } while (doc.exists)
      }

      // Check if the ID is valid.
      else {
        if (id.length < 7 || id.length > 30) {
          throw new Error('Pastebin ID must consist of 7 to 30 characters.')
        }
        if (/[^a-z0-9-]/.test(id)) {
          throw new Error('Pastebin ID must only contain a-z, 0-9 and hyphen.')
        }

        doc = await this.getPastebinDoc(id)
      }

      return doc
    },

    async loadPastebin() {
      this.isLoading = true
      this.pastebinAgreement = false

      try {
        const pastebinDoc = await this.getPastebinDoc(this.pastebinID)
        if (pastebinDoc.exists) {
          this.pastebinDoc = pastebinDoc
          this.pastebinID = pastebinDoc.id
          this.pastebinContent = pastebinDoc.data().content
        } else {
          throw new Error(
            `The Pastebin ID (${this.pastebinID}) does not exist.`
          )
        }
      } catch (e) {
        this.alert(e.message)
      }

      this.isLoading = false
    },

    async createOrLoadPastebin() {
      if (!this.pastebinIDForm) {
        this.alert(
          'Failed to load the Pastebin. Please fix the highlighted input issues first.'
        )
        return
      }

      this.isLoading = true
      this.pastebinAgreement = false

      try {
        this.pastebinDoc = await this.createOrLoadPastebinDoc(this.pastebinID)
        this.pastebinID = this.pastebinDoc.id
        if (this.pastebinDoc.exists) {
          this.pastebinContent = this.pastebinDoc.data().content
        } else {
          this.pastebinContent = ''
        }
      } catch (e) {
        this.alert(e.message)
      }

      this.isLoading = false
    },

    async savePastebin() {
      this.$refs.pastebinContentForm.validate()

      if (!this.pastebinContentForm) {
        this.alert(
          'Failed to save the Pastebin. Please fix the highlighted input issues first.'
        )
        return
      }

      this.isLoading = true

      try {
        this.pastebinID = this.pastebinDoc.id
        await this.savePastebinDoc(this.pastebinDoc, this.pastebinContent)
        this.alert('The Pastebin is saved successfully.')
      } catch (e) {
        this.alert(e.message)
      }

      this.isLoading = false
    }
  }
}
</script>
