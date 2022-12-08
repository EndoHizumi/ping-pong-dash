<template>
  <div class="twitter_share">
    <button
      @click="twitterShare"
      class="border-2 border-blue-600 rounded-full h-14 w-64 items-center flex justify-center m-auto my-8 hover:bg-blue-200 duration-1000"
    >結果をツイートする</button>
  </div>
</template>
 
 <script>
export default {
  name: "tweetVue",
  props:{
    count: Number,
    reason: String
  },
  methods: {
    twitterShare() {
      //シェアする画面を設定
      var shareURL =
        "https://twitter.com/intent/tweet?text=" 
        + this.reason + '<br>'
        + "ピンポンした回数：" + this.count
        +"&url=https://www.google.com/?hl=ja";
      //シェアようの画面へ移行
      location.href = shareURL;
    }
  }
}
</script>
 
 