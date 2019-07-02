<template>
  <div id="sidebar">

  	<!-- Search area -->
  	<div id="sidebar-search">
  		
		<input v-model="search_term" placeholder="Search..." id="search-box" @keyup.enter="search()">
		{{test}}
  	</div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      search_term: '',
      test: '',
      wiki: {

      	pages: [],
      	links: []
      }
    }
  },

  methods: function () {
  	search() {
  		this.test = this.search_term;

  	}
  }
}
</script>