<template>
  <v-container id="apps--data-converter" class="pa-0" fluid>
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
    <v-layout wrap>
      <v-flex xs12>
        <v-card
          :class="{
            'pa-4': $vuetify.breakpoint.smAndDown,
            'pa-5': $vuetify.breakpoint.mdAndUp
          }"
          color="secondary"
          tile
          flat
          dark
        >
          <v-layout justify-center>
            <v-flex xs12 sm8>
              <v-layout wrap align-center>
                <v-flex xs12>
                  <div id="input-textarea" class="code">
                    <v-textarea
                      light
                      solo
                      hide-details
                      placeholder="Put your data here"
                      :rows="
                        $vuetify.breakpoint.mdAndUp
                          ? 16
                          : $vuetify.breakpoint.sm
                          ? 12
                          : 8
                      "
                      @input="updateInputData"
                    />
                  </div>
                </v-flex>
                <v-flex xs12 text-xs-center mt-4>
                  <div id="input-buttons" class="elevation-2">
                    <template v-for="(btn, i) in inputButtons">
                      <v-btn
                        light
                        flat
                        :key="i"
                        @click="processData(btn.click)"
                      >
                        {{ btn.title }}
                      </v-btn>
                    </template>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <div
          id="output"
          :class="{
            'pa-4': $vuetify.breakpoint.smAndDown,
            'pa-5': $vuetify.breakpoint.mdAndUp
          }"
        >
          <v-layout justify-center>
            <v-flex xs12 sm8>
              <v-layout wrap align-center>
                <v-flex xs12>
                  <div id="output-textarea" class="code">
                    <v-textarea
                      readonly
                      solo
                      hide-details
                      :rows="
                        $vuetify.breakpoint.mdAndUp
                          ? 16
                          : $vuetify.breakpoint.sm
                          ? 12
                          : 8
                      "
                      :value="outputDataContent"
                    />
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.code textarea {
  font-family: Ubuntu Mono, Menlo, Monaco, Consolas, Courier New, monospace;
}

#input-buttons {
  display: block;
  border-radius: 2px;
  background-color: #f5f5f5;
}
#input-buttons button {
  margin: 0;
  width: 100%;
  border-radius: 0;
}
#input-buttons button:not(:last-child) {
  border-bottom: 1px #ccc solid;
}

@media (min-width: 600px) {
  #input-buttons {
    display: inline-block;
  }
  #input-buttons button {
    width: auto;
  }
  #input-buttons button:not(:last-child) {
    border-bottom: none;
    border-right: 1px #ccc solid;
  }
}
</style>

<script>
import yaml from 'js-yaml'

const _inputButtons = {
  none: [
    {
      title: 'Pending',
      click: ''
    }
  ],
  json: [
    {
      title: 'Beautify',
      click: 'beautify'
    },
    {
      title: 'Minify',
      click: 'minify'
    },
    {
      title: 'Convert to YAML',
      click: 'convert'
    }
  ],
  yaml: [
    {
      title: 'Convert to JSON',
      click: 'convert'
    }
  ]
}

const _processData = {
  beautify(type, content) {
    try {
      if (type === 'json') {
        return JSON.stringify(JSON.parse(content), null, 2)
      }
    } catch (e) {
      console.warn(e.stack)
      throw new Error(`Invalid ${type.toUpperCase()}`)
    }
  },

  minify(type, content) {
    try {
      if (type === 'json') {
        return JSON.stringify(JSON.parse(content))
      }
    } catch (e) {
      console.warn(e.stack)
      throw new Error(`Invalid ${type.toUpperCase()}`)
    }
  },

  convert(type, content) {
    try {
      if (type === 'json') {
        return yaml.safeDump(JSON.parse(content))
      }
      if (type === 'yaml') {
        return JSON.stringify(yaml.safeLoad(content), null, 2)
      }
    } catch (e) {
      console.warn(e.stack)
      throw new Error(`Invalid ${type.toUpperCase()}`)
    }
  }
}

function _couldBeJSON(val) {
  if (!val || typeof val !== 'string') {
    return false
  }
  return val[0] === '{' || val[0] === '['
}

export default {
  data() {
    return {
      showHint: false,
      hint: '',
      inputDataType: 'none',
      inputDataContent: '',
      inputButtons: _inputButtons.none,
      outputDataContent: 'Put your data into the above text box 👆🏽'
    }
  },

  methods: {
    updateInputData(content) {
      this.inputDataContent = content

      let _inputDataType
      if (!content.length) {
        _inputDataType = 'none'
      } else if (_couldBeJSON(content)) {
        _inputDataType = 'json'
      } else {
        _inputDataType = 'yaml'
      }

      if (this.inputDataType !== _inputDataType) {
        this.showHint = false
        if (_inputDataType !== 'none') {
          this.hint = `Your data is detected to be ${_inputDataType.toUpperCase()}.`
          this.showHint = true
        }
        this.inputDataType = _inputDataType
        this.inputButtons = _inputButtons[_inputDataType]
      }
    },

    processData(action) {
      const _processor = _processData[action]
      if (_processor) {
        try {
          this.outputDataContent = _processor(
            this.inputDataType,
            this.inputDataContent
          )
          this.$vuetify.goTo('#output')
        } catch (e) {
          this.hint = e.message
          this.showHint = true
        }
      }
    }
  }
}
</script>
