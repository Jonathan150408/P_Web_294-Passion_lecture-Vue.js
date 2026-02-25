<script setup>
const props = defineProps({
  appearBig: {
    type: Boolean,
    required: true,
  },
  showCategory: {
    type: Boolean,
    required: true,
  },
  book: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="`/books/${book.id}`">
    <div
      class="book"
      :class="appearBig ? 'big' : 'normal'"
      :style="{ backgroundImage: book.imagePath ? `url('${book.imagePath}')` : '' }"
    >
      <div class="info-bar">
        <span class="author">{{ book.writerId }}</span>
        <span class="category" v-if="showCategory">{{ book.categoryId }}</span>
      </div>
      <div class="title-bar">
        <span class="title">{{ book.title }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.book {
  width: 200px;
  height: 340px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #fff;
  position: relative;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
  text-decoration: none;
}

.info-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  background: #585553;
  color: #fff;
  padding: 1em 1em 0.5em 1em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1em;
}
.info-bar .author {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
}
.info-bar .category {
  font-size: 0.95em;
  font-style: italic;
  margin: 0;
}
.title-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #585553;
  color: #fff;
  padding: 0.5em 1em 1em 1em;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: flex-end;
}
.title-bar .title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
}
</style>
