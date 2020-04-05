<template>
  <v-container id="apps--password-generator" fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-card id="output" color="secondary" tile flat dark>
            <v-card-text class="px-5">
              <div style="position: relative; padding-right: 95px;">
                <v-text-field
                  id="output-password"
                  readonly
                  dark
                  flat
                  height="50"
                  color="#fff"
                  v-model="outputPassword"
                />
                <v-btn
                  flat
                  icon
                  large
                  dark
                  style="position: absolute; top: 10px; right: 35px;"
                  @click="generatePassword"
                >
                  <v-icon large>refresh</v-icon>
                </v-btn>
                <v-btn
                  id="copy-password"
                  flat
                  icon
                  large
                  dark
                  style="position: absolute; top: 10px; right: -15px;"
                  data-clipboard-target="#output-password"
                >
                  <v-icon medium>file_copy</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-text class="px-5">
              <v-container fluid class="px-0">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader class="pl-0 pb-3">Password Length</v-subheader>
                    <v-slider
                      thumb-label="always"
                      always-dirty
                      min="4"
                      max="50"
                      v-model="inputPasswordLength"
                      @change="generatePassword"
                    />
                  </v-flex>
                  <v-flex xs12 md3>
                    <v-checkbox
                      color="primary"
                      v-model="inputPasswordCharsetTypes"
                      @change="generatePassword"
                      label="Uppercase"
                      value="uppercase"
                    />
                  </v-flex>
                  <v-flex xs12 md3>
                    <v-checkbox
                      color="primary"
                      v-model="inputPasswordCharsetTypes"
                      @change="generatePassword"
                      label="Lowercase"
                      value="lowercase"
                    />
                  </v-flex>
                  <v-flex xs12 md3>
                    <v-checkbox
                      color="primary"
                      v-model="inputPasswordCharsetTypes"
                      @change="generatePassword"
                      label="Numbers"
                      value="numbers"
                    />
                  </v-flex>
                  <v-flex xs12 md3>
                    <v-checkbox
                      color="primary"
                      v-model="inputPasswordCharsetTypes"
                      @change="generatePassword"
                      label="Symbols"
                      value="symbols"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
#output input {
  max-height: none;
  font-size: 30px;
  font-family: Ubuntu Mono, Menlo, Monaco, Consolas, Courier New, monospace;
}

@media (min-width: 600px) {
}
</style>

<script>
import ClipboardJS from 'clipboard'

const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '`-=~!@#$%^&*()_+'
}

const defaultInputs = {
  passwordLength: 20,
  passwordCharsetTypes: Object.keys(charsets)
}

function secureRandom(max) {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32 - 1)
  return Math.floor(n * max)
}

export default {
  mounted() {
    this.generatePassword()
    new ClipboardJS('#copy-password')
  },

  data() {
    return {
      inputPasswordLength: defaultInputs.passwordLength,
      inputPasswordCharsetTypes: defaultInputs.passwordCharsetTypes,
      outputPassword: ''
    }
  },

  methods: {
    generatePassword: function() {
      const passwordLength =
        this.inputPasswordLength || defaultInputs.passwordLength
      const passwordCharsetTypes =
        this.inputPasswordCharsetTypes || defaultInputs.passwordCharsetTypes

      let charset = ''
      for (const type of passwordCharsetTypes) {
        charset += charsets[type]
      }

      let result = ''
      for (let i = 0; i < passwordLength; i++) {
        const n = secureRandom(charset.length)
        result += charset.charAt(n)
      }

      this.outputPassword = result
    }
  }
}
</script>
