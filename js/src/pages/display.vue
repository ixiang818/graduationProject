<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar no-shadow>
      <f7-nav-title class="navbar-calendar-title"></f7-nav-title>
      <f7-nav-right>
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-demo"
          icon-ios="f7:search"
          icon-aurora="f7:search"
          icon-md="material:search"
        ></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-demo"
        expandable
        :clear-button="true"
        :custom-search="true"
        @input="search"
      ></f7-searchbar>
    </f7-navbar>

    <f7-block>
      <div
        id="calendar"
        class="block block-strong no-padding no-margin no-hairline-top"
      ></div>
    </f7-block>

    <f7-list
      id="calendar-events"
      class="no-margin no-hairlines no-safe-area-left"
      media-list
    >
      <f7-list-item
        v-for="(item, index) in eventItems"
        :key="index"
        :title="item.wether +' & '+ item.mood"
        :after="item.time"
        :text="item.text"
        swipeout
      >
      <f7-swipeout-actions right>
        <f7-swipeout-button delete @click="deleteItem">Delete</f7-swipeout-button>
      </f7-swipeout-actions>
      </f7-list-item>

      <f7-list-item v-if="eventItems.length === 0">
        <template #title>
          <span class="text-color-gray">今天没有写日记~</span>
        </template>
      </f7-list-item>

    </f7-list>

  </f7-page>
</template>
<script>
import {f7} from "framework7-vue";
import $ from "dom7";
import UtilsFunctions from '../utils/utils.js';

export default {
  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      searchQuery: '',
      today: new Date(year, month, day),
      events: [],
      eventItems: [],
    };
  },
  methods: {
    renderEvents(calendar) {
      const self = this;
      const currentDate = calendar.value[0];
      const currentEvents = self.events.filter(
        (event) =>
          event.date >= currentDate.getTime() &&
          event.date < currentDate.getTime() + 24 * 60 * 60 * 1000
      );

      const eventItems = [];
      if (currentEvents.length) {
        currentEvents.forEach((event) => {
          const hours = event.hours;
          let minutes = event.minutes;
          if (minutes < 10) minutes = `0${minutes}`;
          eventItems.push({
            wether:event.wether,
            mood:event.mood,
            text:event.text,
            time: `${hours}:${minutes}`,
          });
        });
      }
      self.eventItems = eventItems;
    },

    async onPageInit(page) {
      const self = this;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const res = await self.$get(`/getevents`);
      console.log(res)
      this.events = res.data
    
      //取数据放events
      self.calendar = f7.calendar.create({
        containerEl: "#calendar",
        toolbar: false,
        value: [self.today],
        events: self.events,
        on: {
          init(calendar) {
            $(".navbar-calendar-title").text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            );
            f7.navbar.size(f7.navbar.getElByPage(page.el));
            calendar.$el.addClass("no-safe-area-right");
            self.renderEvents(calendar);
          },
          monthYearChangeStart(calendar) {
            $(".navbar-calendar-title").text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            );
            f7.navbar.size(f7.navbar.getElByPage(page.el));
          },
          change(calendar) {
            self.renderEvents(calendar);
          },
        },
      });
    },

    onPageBeforeRemove() {
      const self = this;
      self.calendar.destroy();
    },

    deleteItem(){
      f7.toast.create({
          text: '已删除',
          position: 'center',
          closeTimeout: 2000,
        }).open();
    },

    search: UtilsFunctions.debounce(async function(e){
     this.searchQuery = e.target.value
     console.log(this.searchQuery)
    }, 400),
  },
};
</script>
