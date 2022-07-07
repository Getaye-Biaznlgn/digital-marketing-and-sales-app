<template>
  <div ref="mapDiv" style="width: 100%; height: 50vh" class=""></div>
</template>

<script setup>
import { onMounted, ref, defineEmits, toRaw } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import {GOOGLE_MAP_API_KEY } from "../resources/google_map_api_key"
// const GOOGLE_MAP_API_KEY = "AIzaSyBuMJ86uj9D-3vqFDgrD0vcdj39LZ-G1og";

let clickListener = null;
const loader = new Loader({ apiKey: GOOGLE_MAP_API_KEY });
const mapDiv = ref(null);
const emit = defineEmits(["selectPosition"]);
let markers = [];
let selectedPosition = ref(null);
let map = ref(null);
let marker = ref(null);
onMounted(async () => {
  await loader.load();
  // eslint-disable-next-line no-undef
  map.value = new google.maps.Map(mapDiv.value, {
    center: { lat: 8.965852, lng: 38.730757 },
    zoom: 7,
  });
  clickListener = map.value.addListener("click", ({ latLng: { lat, lng } }) => {
    selectedPosition.value = { lat: lat(), lng: lng() };
    emit("selectPosition", { lat: lat(), lng: lng() });
    markers.map((marker) => toRaw(marker).setMap(null))
    // eslint-disable-next-line no-undef
    marker.value = new google.maps.Marker({
      position: selectedPosition.value,
      map: map.value,
      title: 'Rensys Shop',
    });
    markers.push(marker.value)
    
  });
});
onMounted(() => {
  if (clickListener) clickListener.remove();
});
</script>

<style></style>
