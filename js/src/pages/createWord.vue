<template>
  <f7-page>
    <f7-navbar title="文字日记" back-link="Back"></f7-navbar>
    <f7-block-title>今天是{{ year }}/{{ month }}/{{ day }}</f7-block-title>
    <f7-list>
      <f7-list-item
        title="天气"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select v-model="wetherActive" @change="changeWether($event)">
          <option value="Sun" selected>晴朗</option>
          <option value="Cloud">多云</option>
          <option value="Rain">降雨</option>
        </select>
      </f7-list-item>
      <f7-list-item
        title="心情"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select v-model="moodActive" @change="changeMood($event)">
          <option value="happy" selected>开心</option>
          <option value="calm">平静</option>
          <option value="upset">烦恼</option>
          <option value="sad">伤心</option>
          <option value="angry">生气</option>
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
      <f7-button raised fill @click="createWord">保存</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      date: date,
      year: year,
      month: month,
      day: day,
      wetherActive: "Sun",
      moodActive: "happy",
      textValue: "",
    };
  },
  methods: {
    changeWether(event) {
      this.wetherActive = event.target.value;
      console.log(this.wetherActive);
    },
    changeMood(event) {
      this.moodActive = event.target.value;
      console.log(this.moodActive);
    },
    async createWord(){
      const res = await this.$post(
          `/createWord`,{
            date: new Date().getTime(),
            wether:this.wetherActive,
            mood:this.moodActive,
            text:this.textValue,
            hours: this.date.getHours(),
            minutes: this.date.getMinutes(),
          })
      if(res.success == true){
        this.$f7.toast.create({
          text: '添加成功',
          position: 'center',
          closeTimeout: 2000,
        }).open();
        this.$f7router.back();
      }else{
        this.$f7.toast.create({
          text: '添加失败',
          position: 'center',
          closeTimeout: 2000,
        }).open();
      }
    }
  },
};
</script>