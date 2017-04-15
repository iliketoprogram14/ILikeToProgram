// Shamelessly taken from https://alexpearce.me/2016/02/simpler-jekyll-searching/
(function(window, document, undefined) {
  'use strict';

  // Search page URL without leading slash
  var SEARCH_PATH = 'search.html';

  var ready = function(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Return an object of `key: value` pairs from the GET search string
  var parseSearchParameters = function(search) {
    var ret = {},
        // Each key-value pair is separated with an ampersand
        params = search.split('&'),
        i, kv;
    for (i = 0; i < params.length; i++) {
      // Keys are separated from values with an equals sign
      var kv = params[i].split('=');
      ret[kv[0]] = kv[1];
    };
    return ret;
  };

  // Only display posts on the search page that match the query
  var filterPosts = function(tagsContainer) {
    var params = parseSearchParameters(window.location.search.slice(1)),
        hasTag = params.tag !== undefined,
        children, child, searchTerm, i;

    // 0 or more than 1 search terms were specified
    if (!hasTag) {
      tagsContainer.style.display = 'none';
      return;
    }

    // If we're here, there's only one search term
    if (hasTag) {
      tagsContainer.style.display = 'block';
      children = tagsContainer.children;
      searchTerm = decodeURI(params.tag);
    }

    for (i = 0; i < children.length; i++) {
      child = children[i];
      child.style.display = decodeURI(child.dataset.name) === searchTerm ? 'block' : 'none';
    };
  };

  ready(function() {
    // If we're on the search page, get the index containers and filter them
    // based on the GET query
    if (window.location.pathname.slice(-SEARCH_PATH.length) === SEARCH_PATH) {
      var tagsContainer = document.querySelectorAll('#tag-index');
      // We need both containers for the method to work
      if (!tagsContainer.length !== 1) {
        filterPosts(tagsContainer[0]);
      }
    }
  });
})(window, window.document);