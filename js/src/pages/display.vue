<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit" @page:beforein="onPageBeforeIn">
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

    <div class="list simple-list" v-if="isShowList">
      <ul>
        <li
          v-for="(item, index) in searchItems"
          :key="index"
          @click="setYearMonth(item.date)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>

    <div v-show="!isShowList">
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
          :key="item.id"
          :title="item.wether + ' & ' + item.mood"
          :after="item.time"
          :text="item.text"
          swipeout
        >
          <f7-swipeout-actions right>
            <f7-swipeout-button color="#2196f3" @click="moreItem(item)"
              >More</f7-swipeout-button
            >
            <f7-swipeout-button color="green" @click="updateItem(item)"
              >Update</f7-swipeout-button
            >
            <f7-swipeout-button color="red" @click="deleteItem(item, index)"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>

        <f7-list-item v-if="eventItems.length === 0">
          <template #title>
            <span class="text-color-gray">今天没有写日记~</span>
          </template>
        </f7-list-item>
      </f7-list>
    </div>
  </f7-page>
</template>
<script>
import { f7 } from "framework7-vue";
import $ from "dom7";
import UtilsFunctions from "../utils/utils.js";
import moment from 'moment'

export default {
  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      isShowList: false,
      searchQuery: "",
      today: new Date(year, month, day),
      events: [],
      eventItems: [],
      myCalendar: {},
      searchItems: [],
    };
  },
  methods: {
    renderEvents(calendar) {
      const self = this;
      var currentDate
      if (calendar && calendar.value) {
        currentDate = calendar.value[0];
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
              id: event.Id,
              date: event.date,
              wether: event.wether,
              mood: event.mood,
              text: event.text,
              time: `${hours}:${minutes}`,
            });
          });
        }
        self.eventItems = eventItems;
      }
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
      console.log(res);
      this.events = res.data;
      for (let i = 0; i < this.events.length; i ++) {
        let dateTime = new Date(this.events[i]['date']);
        this.events[i]['date'] = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
        this.events[i]['color'] = '#2196f3'
      }
      self.myCalendar = f7.calendar.create({
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

    onPageBeforeIn() {
      this.$store.commit("setIsUpdatingDiary", false);
    },

    onPageBeforeRemove() {
      const self = this;
      if (self.calendar) {
        self.calendar.destroy()
      }
    },

    moreItem(item) {
      const self = this;
      console.log(item);
      self.actions = f7.actions.create({
        buttons: [
          {
            text: item.text,
            label: true,
          },
        ],
      });
      self.actions.open();
    },

    async updateItem(item) {
      const self = this;
      console.log(item);
      this.$store.commit("setUpdateDiary", item);
      this.$store.commit("setIsUpdatingDiary", true);
      self.$f7router.navigate('/createWord/', {
        props: {
          diaryItem: item
        }
      })
    },

    deleteItem(item, index) {
      const self = this;
      console.log(item, index);

      self.$f7.dialog.confirm('您确定要删除改日记吗', '删除日记', async function () {
        // self.events.splice(index, 1);
        // self.renderEvents(self.myCalendar);

        const res = await self.$post(`/deleteWord`, {
          id: item.id,
        });
        if (res.success == true) {
          self.eventItems.splice(index, 1);
          for (let k = 0; k < self.events.length; k++) {
            if (self.events[k]['Id'] === item['id']) {
              self.events.splice(k, 1)
              break
            }
          }
          f7.toast
            .create({
              text: "已删除",
              position: "center",
              closeTimeout: 2000,
            })
            .open();
        }
      }, null)
    },

    setYearMonth(value) {
      const self = this;
      console.log(value);
      let dateTime = new Date(value);
      let dateTemp = moment(dateTime).format('yyyy-MM-DD')
      let date = new Date(moment(dateTemp, 'yyyy-MM-DD').valueOf())
      self.myCalendar.setYearMonth(dateTime.getFullYear(), dateTime.getMonth());
      self.myCalendar.setValue([date]);
      self.myCalendar.update();
      self.isShowList = false;
      self.renderEvents(self.myCalendar)
    },

    search: UtilsFunctions.debounce(async function (e) {
      this.searchQuery = e.target.value;
      console.log(this.searchQuery);
      this.isShowList = this.searchQuery.length > 0;
      const res = await this.$post(`/search`, {
        searchQuery: this.searchQuery,
      });
      if (res.success == true) {
        console.log(res.data);
        this.searchItems = res.data;
      } else {
        this.$f7.toast
          .create({
            text: "搜索失败",
            position: "center",
            closeTimeout: 2000,
          })
          .open();
      }
    }, 400),
  },
};
</script>
