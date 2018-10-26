<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">

                <v-icon>wb_incandescent</v-icon>

                <v-toolbar-title>BUY LIGHT</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>

                </v-tooltip>

              </v-toolbar>
              <v-card-text>
                <v-switch
                  label="Connect to Microbit"
                  v-model="isConnected"
                  v-on:change="onConnectToggle">
                </v-switch>
                <v-btn
                  large
                  :loading="isLoading"
                  :disabled="isLoading"
                  color="cyan"
                  class="white--text"
                  v-if="isConnected"
                  @click="showLEDs"
                  >
                    Pay
                    <v-icon right dark>payment</v-icon>
                </v-btn>
              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const EVENT_FAMILY = 0x22b8; //Event ID: 8888;
const EVENT_VALUE = 1001;
const EVENTSERVICE_SERVICE_UUID = 'e95d93af-251d-470a-a062-fa1922dfa9a8';
const MICROBITEVENT_CHARACTERISTIC_UUID =
	'e95d9775-251d-470a-a062-fa1922dfa9a8';
const CLIENTEVENT_CHARACTERISTIC_UUID = 'e95d5404-251d-470a-a062-fa1922dfa9a8';

let server, service, writeCharacteristic, writeClientEvtCharacteristic;

export default {
	data() {
		return {
			isConnected: false,
			isLoading: false
		};
	},
	methods: {
		async onConnectToggle() {
			const device = await navigator.bluetooth.requestDevice({
				filters: [
					{
						namePrefix: 'BBC micro:bit'
					}
				],
				optionalServices: [EVENTSERVICE_SERVICE_UUID]
			});
			server = await device.gatt.connect();
			service = await server.getPrimaryService(EVENTSERVICE_SERVICE_UUID);
			writeCharacteristic = await service.getCharacteristic(
				MICROBITEVENT_CHARACTERISTIC_UUID
			);

			writeClientEvtCharacteristic = await service.getCharacteristic(
				CLIENTEVENT_CHARACTERISTIC_UUID
			);

			//await server.disconnect();
		},
		showLEDs() {
			if (writeCharacteristic) {
				const bytes = [EVENT_FAMILY, EVENT_VALUE];
				const data = new Uint16Array(bytes);
				writeClientEvtCharacteristic.writeValue(data); //handle errors
			}
		}
	}
};
</script>
