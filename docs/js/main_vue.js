new Vue({

	el: '#app',	

	data: {

		algoryal_api_ulr: "https://algoryalapi.firebaseio.com/",
		search_term: "",
		no_search_results: true,
		no_link_search_results: true,
		current_page: {
			title: "",
			date: "",
			icon: "",
			content: "",
			paths: [
				{title: "WIKI", link: "./"},
				{title: "", link: "#"}
			]
		},
		wiki_pages: [
			{
				title: "Home",
				date: "22 June 2019",
				icon: "fas fa-home",
				content: './Pages/home.html'
			},
			{
				title: "AlgoryalAPI",
				date: "22 June 2019",
				icon: "fas fa-server",
				content: './Pages/algoryalapi.html'
			}
		],
		sidebar_links: [
			{ title: 'Website', link: 'https://algoryal.com'},
			{ title: 'Email', link: 'mailto:com.algoryal@gmail.com' }
		],
		sidebar_state: true,
	},

	mounted: function() {
		this.current_page.title = this.wiki_pages[0].title
		this.current_page.date = this.wiki_pages[0].date;
		this.current_page.icon = this.wiki_pages[0].icon;
		this.current_page.content = this.wiki_pages[0].content;
		this.current_page.paths = [{title: 'WIKI', link: './'},{title: this.wiki_pages[0].title, link: '#'}];
	},

	methods: {

	  	toggleSidebar() {
	  		if (this.sidebar_state == true) {
	  			this.sidebar_state = false;
	  		} else {
	  			this.sidebar_state = true;
	  		}
	  	},

	  	handleResize() {
      		if(window.innerWidth <= 1100) {
      			this.sidebar_state = false;
      		} else {
      			this.sidebar_state = true;
      		}
    	},

    	openPage(page) {

    		this.current_page.title = page.title;
    		this.current_page.icon = page.icon;
    		this.current_page.paths[1].title = page.title;
    		this.current_page.content = page.content;
    		this.current_page.date = page.date;

    		document.getElementById("sidebar").style.height = 0+'px';
    		document.getElementById("v-nav-bar").style.height = 0+'px';

    		document.getElementById("sidebar").style.minHeight = this.scrollHeight+'px';
    		document.getElementById("v-nav-bar").style.minHeight = this.scrollHeight+'px';
    		this.includeHTML();
    		this.includeHTML();
    	},

    	goToPath(path) {
    		if (path.title == "WIKI") {
    			this.current_page.title = 'Home';
    			this.current_page.paths[1].title = 'Home';
    			this.current_page.date = '22 June 2019';
    			this.current_page.content = '/Pages/home.html';
    		}
    	},

    	isPageSelected(page_title) {
    		if (page_title == this.current_page.title) {
    			return true;
    		} else {
    			return false;
    		}
    	},

    	includeHTML(cb) {
			var z, i, elmnt, file, xhttp;
			z = document.getElementsByTagName("*");
			for (i = 0; i < z.length; i++) {
				elmnt = z[i];
		    	file = elmnt.getAttribute("w3-include-html");
		    	if (file) {
		      		xhttp = new XMLHttpRequest();
		      		xhttp.onreadystatechange = function() {
		        		if (this.readyState == 4) {
		          			if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		          			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		          			elmnt.removeAttribute("w3-include-html");
		          			w3.includeHTML(cb);
		        		}
		      		}      
		      		xhttp.open("GET", file, true);
		      		xhttp.send();
		      		return;
		    	}
		  	}
    	}
    },

	created: function() {

		window.addEventListener('resize', this.handleResize);
    	this.handleResize();
    	this.openPage(this.current_page);
    	this.includeHTML();
	},

  	destroyed() {

    	window.removeEventListener('resize', this.handleResize)
  	},

	computed: {

		filter_wiki_pages: function() {

			return this.wiki_pages.filter((page) => {
				if (page.title.toUpperCase().match(this.search_term.toUpperCase()) != null) {
					this.no_search_results = false;
				} else {
					if (this.wiki_pages[0].title.toUpperCase().match(this.search_term.toUpperCase())) {
						this.no_search_results = false;
					} else {
						this.no_search_results = true;
					}
				}
				return page.title.toUpperCase().match(this.search_term.toUpperCase());
			});
		},

		filter_sidebar_links: function() {
			return this.sidebar_links.filter((link) => {
				if (link.title.toUpperCase().match(this.search_term.toUpperCase()) != null) {
					this.no_link_search_results = false;
				} else {
					if (this.sidebar_links[0].title.toUpperCase().match(this.search_term.toUpperCase())) {
						this.no_link_search_results = false;
					} else {
						this.no_link_search_results = true;
					}
				}
				return link.title.toUpperCase().match(this.search_term.toUpperCase());
			});
		},

		wiki_banner_transparent: function() {

			var api_url = this.algoryal_api_ulr+"Media/Images/Banners/wiki_banner_cropped_transparent.json"
		    var Httpreq = new XMLHttpRequest(); // a new request
		    Httpreq.open("GET",api_url, false);
		    Httpreq.send(null);

		    var json_obj = Httpreq.responseText;
			return json_obj.replace(/['"]+/g, '');
		},

		favicon: function() {
			var api_url = this.algoryal_api_ulr+"Media/Images/Logos/web_based_logo.json"
		    var Httpreq = new XMLHttpRequest(); // a new request
		    Httpreq.open("GET",api_url, false);
		    Httpreq.send(null);

		    var json_obj = Httpreq.responseText;
			return json_obj.replace(/['"]+/g, '');
		},

		scrollHeight: function() {
			return document.getElementById('page-content').scrollHeight*200;
		}
	}
})