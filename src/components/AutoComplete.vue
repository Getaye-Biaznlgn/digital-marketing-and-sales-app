<template>
  <div class="autocomplete">
    <input
      v-model="search"
      class="form-control rounded-pill"
      @input="onChange"
      placeholder="Search"
      type="text"
    />
    <ul
      v-show="isOpen"
      class="autocomplete-results"
    >
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
    };
  },
  methods: {
    filterResults() {
      this.results = this.items.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
     setResult(result) {
      this.search = result.name;
      this.isOpen = false;
      this.$emit('setResult',result)
    },
 handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
   }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
 

}
</script>
<style scoped>
 .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    position: absolute;
    background-color: #ffffff;
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    /* height: 20em; */
    min-height: 1em;
    /* max-height: 6em;     */
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #f1f1f1;
  }
</style>