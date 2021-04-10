<template>
  <f7-page @page:init="onPageInit">
    <f7-navbar title="文字日记" back-link="Back"></f7-navbar>
    <f7-block-title v-if="diaryDate !== ''">今天是{{ diaryYear }}/{{ diaryMonth }}/{{ diaryDay }}</f7-block-title>
    <f7-list>
      <f7-list-item
        title="天气"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
        v-if="wetherActive !== ''"
      >
        <select v-model="wetherActive" @change="changeWether($event)">
<!--          <option value="Sun">晴朗</option>-->
<!--          <option value="Cloud">多云</option>-->
<!--          <option value="Rain">降雨</option>-->
          <option :value="wether.value" v-for="wether in wetherData">{{wether.name}}</option>
        </select>
      </f7-list-item>
      <f7-list-item
        title="心情"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
        v-if="moodActive !== ''"
      >
        <select v-model="moodActive" @change="changeMood($event)">
<!--          <option value="happy">开心</option>-->
<!--          <option value="calm">平静</option>-->
<!--          <option value="upset">烦恼</option>-->
<!--          <option value="sad">伤心</option>-->
<!--          <option value="angry">生气</option>-->
          <option :value="mood.value" v-for="mood in moodData">{{mood.name}}</option>
        </select>
      </f7-list-item>
    </f7-list>

    <f7-block-title>今天过得如何？</f7-block-title>
    <f7-text-editor
      placeholder="Enter text..."
      mode="popover"
      :value="textValue"
      @texteditor:change="(v) => (textValue = v)"
      style="--f7-text-editor-height: 150px"
    ></f7-text-editor>

    <f7-block>
      <f7-button raised fill @click="saveDiary">保存</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import {f7} from "framework7-vue";
import $ from "dom7";

export default {
  data() {
    return {
      diaryId: '',
      diaryDate: '',
      diaryYear: '',
      diaryMonth: '',
      diaryDay: '',
      moodData: [
        {
          value: 'happy',
          name: '开心',
        },
        {
          value: 'calm',
          name: '平静',
        },
        {
          value: 'upset',
          name: '烦恼',
        },
        {
          value: 'sad',
          name: '伤心',
        },
        {
          value: 'angry',
          name: '生气',
        },
      ],
      wetherData: [
        {
          value: 'Sun',
          name: '晴朗',
        },
        {
          value: 'Cloud',
          name: '多云',
        },
        {
          value: 'Rain',
          name: '降雨',
        }
      ],
      wetherActive: "",
      moodActive: "",
      textValue: "",
    };
  },
  props: [
    'diaryItem'
  ],
  methods: {
    changeWether(event) {
      this.wetherActive = event.target.value;
      console.log(this.wetherActive);
    },
    changeMood(event) {
      this.moodActive = event.target.value;
      console.log(this.moodActive);
    },
    onPageInit() {
      console.log('onPageInit')
      console.log(JSON.stringify(this.diaryItem))
      if (this.diaryItem) {
        this.diaryId = this.diaryItem['id']
        this.wetherActive = this.diaryItem['wether']
        this.moodActive = this.diaryItem['mood']
        this.textValue = this.diaryItem['text'];
        this.diaryDate = new Date(this.diaryItem['date']);
        this.diaryYear = this.diaryDate.getFullYear();
        this.diaryMonth = this.diaryDate.getMonth() + 1;
        this.diaryDay = this.diaryDate.getDate();
      } else {
        this.moodActive = 'happy'
        this.wetherActive = 'Sun'
        this.diaryDate = new Date();
        this.diaryYear = this.diaryDate.getFullYear();
        this.diaryMonth = this.diaryDate.getMonth() + 1;
        this.diaryDay = this.diaryDate.getDate();
      }
    },
    saveDiary() {
      if (this.diaryId !== '') {
        this.updateWord()
      } else {
        this.createWord()
      }
    },
    async createWord() {
      if (this.textValue != "") {
        let dateTime = new Date();
        const res = await this.$post(`/createWord`, {
          date: dateTime.getTime(),
          wether: this.wetherActive,
          mood: this.moodActive,
          text: this.textValue,
          hours: dateTime.getHours(),
          minutes: dateTime.getMinutes(),
        });
        if (res.success == true) {
          this.$f7.toast
            .create({
              text: "添加成功",
              position: "center",
              closeTimeout: 2000,
            })
            .open();
          this.$f7router.navigate("/");
        }
      } else {
        this.$f7.toast
          .create({
            text: "请填写文字后再添加",
            position: "center",
            closeTimeout: 2000,
          })
          .open();
      }
    },
    async updateWord() {
      if (this.textValue != "") {
        const res = await this.$post(`/updateWord`, {
          id: this.diaryId,
          wether: this.wetherActive,
          mood: this.moodActive,
          text: this.textValue,
        });
        if (res.success == true) {
          this.$f7.toast
            .create({
              text: "更新成功",
              position: "center",
              closeTimeout: 2000,
            })
            .open();
          this.$store.state.updateDiary['mood'] = this.moodActive
          this.$store.state.updateDiary['wether'] = this.wetherActive
          this.$store.state.updateDiary['text'] = this.textValue
          this.$f7router.back();
        }
      } else {
        this.$f7.toast
          .create({
            text: "请填写文字后再更新",
            position: "center",
            closeTimeout: 2000,
          })
          .open();
      }
    },
  },
};
</script>
