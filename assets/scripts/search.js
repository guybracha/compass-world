// assets/scripts/search.js
// מודול חיפוש מודולרי ומרכזי לכל דפי האתר

/**
 * Search Module - מודול חיפוש גמיש ומודולרי
 * תומך בחיפוש טקסט, פילטור לפי תגיות, ומיון
 */
const SearchModule = (() => {
  'use strict';

  /**
   * נרמול טקסט לחיפוש (הסרת רווחים, lowercase)
   * @param {string} text - הטקסט לנרמול
   * @returns {string} טקסט מנורמל
   */
  function normalizeText(text) {
    if (!text) return '';
    return String(text).toLowerCase().trim();
  }

  /**
   * בדיקה האם פריט עונה על קריטריוני החיפוש
   * @param {Object} item - הפריט לבדיקה
   * @param {string} searchTerm - מונח החיפוש
   * @param {Array<string>} searchFields - שדות לחיפוש בהם
   * @returns {boolean}
   */
  function matchesSearch(item, searchTerm, searchFields) {
    if (!searchTerm) return true;

    const normalizedTerm = normalizeText(searchTerm);
    
    return searchFields.some(field => {
      const value = item[field];
      if (Array.isArray(value)) {
        return value.some(v => normalizeText(v).includes(normalizedTerm));
      }
      return normalizeText(value).includes(normalizedTerm);
    });
  }

  /**
   * פילטור פריטים לפי תגיות
   * @param {Array} items - רשימת הפריטים
   * @param {string|Array} tags - תגית או מערך תגיות לפילטור
   * @param {string} tagField - שם השדה שמכיל תגיות
   * @returns {Array}
   */
  function filterByTags(items, tags, tagField = 'tags') {
    if (!tags || (Array.isArray(tags) && tags.length === 0)) {
      return items;
    }

    const tagArray = Array.isArray(tags) ? tags : [tags];
    const normalizedTags = tagArray.map(t => normalizeText(t));

    return items.filter(item => {
      const itemTags = item[tagField];
      if (!itemTags) return false;
      
      const normalizedItemTags = (Array.isArray(itemTags) ? itemTags : [itemTags])
        .map(t => normalizeText(t));
      
      return normalizedTags.some(tag => normalizedItemTags.includes(tag));
    });
  }

  /**
   * חיפוש וסינון פריטים
   * @param {Array} items - רשימת הפריטים
   * @param {Object} options - אפשרויות החיפוש
   * @param {string} options.searchTerm - מונח החיפוש
   * @param {Array<string>} options.searchFields - שדות לחיפוש
   * @param {string|Array} options.tags - תגיות לפילטור
   * @param {string} options.tagField - שדה התגיות
   * @returns {Array}
   */
  function search(items, options = {}) {
    const {
      searchTerm = '',
      searchFields = [],
      tags = null,
      tagField = 'tags'
    } = options;

    let results = [...items];

    // סינון לפי תגיות
    if (tags) {
      results = filterByTags(results, tags, tagField);
    }

    // חיפוש טקסט
    if (searchTerm && searchFields.length > 0) {
      results = results.filter(item => 
        matchesSearch(item, searchTerm, searchFields)
      );
    }

    return results;
  }

  /**
   * מיון פריטים
   * @param {Array} items - רשימת הפריטים למיון
   * @param {string} sortBy - שדה למיון לפיו
   * @param {string} order - סדר המיון ('asc' או 'desc')
   * @returns {Array}
   */
  function sort(items, sortBy, order = 'asc') {
    if (!sortBy) return items;

    const sorted = [...items].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      // טיפול במספרים
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // טיפול במחרוזות
      const aStr = normalizeText(aVal);
      const bStr = normalizeText(bVal);
      
      if (order === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });

    return sorted;
  }

  /**
   * חיפוש מתקדם עם מיון
   * @param {Array} items - רשימת הפריטים
   * @param {Object} options - אפשרויות החיפוש והמיון
   * @returns {Array}
   */
  function searchAndSort(items, options = {}) {
    const { sortBy, order = 'asc', ...searchOptions } = options;
    
    let results = search(items, searchOptions);
    
    if (sortBy) {
      results = sort(results, sortBy, order);
    }

    return results;
  }

  /**
   * יצירת אינדקס לחיפוש מהיר
   * @param {Array} items - רשימת הפריטים
   * @param {Array<string>} fields - שדות ליצירת אינדקס
   * @returns {Map}
   */
  function createSearchIndex(items, fields) {
    const index = new Map();

    items.forEach((item, idx) => {
      fields.forEach(field => {
        const value = item[field];
        const values = Array.isArray(value) ? value : [value];
        
        values.forEach(val => {
          const normalized = normalizeText(val);
          if (!index.has(normalized)) {
            index.set(normalized, []);
          }
          index.get(normalized).push(idx);
        });
      });
    });

    return index;
  }

  /**
   * קבלת תגיות ייחודיות מרשימת פריטים
   * @param {Array} items - רשימת הפריטים
   * @param {string} tagField - שדה התגיות
   * @returns {Array<string>}
   */
  function getUniqueTags(items, tagField = 'tags') {
    const tagsSet = new Set();
    
    items.forEach(item => {
      const tags = item[tagField];
      if (Array.isArray(tags)) {
        tags.forEach(tag => tagsSet.add(tag));
      } else if (tags) {
        tagsSet.add(tags);
      }
    });

    return Array.from(tagsSet).sort();
  }

  /**
   * חיפוש מטושטש (fuzzy search)
   * @param {string} term - מונח החיפוש
   * @param {string} target - מחרוזת היעד
   * @param {number} threshold - סף הדמיון (0-1)
   * @returns {boolean}
   */
  function fuzzyMatch(term, target, threshold = 0.6) {
    const normalizedTerm = normalizeText(term);
    const normalizedTarget = normalizeText(target);

    if (normalizedTarget.includes(normalizedTerm)) return true;

    // Simple fuzzy matching using character overlap
    const termChars = normalizedTerm.split('');
    let matchCount = 0;

    termChars.forEach(char => {
      if (normalizedTarget.includes(char)) matchCount++;
    });

    const similarity = matchCount / termChars.length;
    return similarity >= threshold;
  }

  // Public API
  return {
    search,
    sort,
    searchAndSort,
    filterByTags,
    createSearchIndex,
    getUniqueTags,
    fuzzyMatch,
    normalizeText
  };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchModule;
}
