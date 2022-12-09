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
        + this.reason + '%0D%0A'
        + "ピンポンした回数：" + this.count + '%0D%0A'
        +"&url=https://ping-pong-dash.netlify.app" + '%0D%0A'
        + "%23ピンポンダッシュ" + '%0D%0A'
        + "%23クソアプリアドベントカレンダー"
      //シェアようの画面へ移行
      location.href = shareURL;
    }
  }
}
</script>
 
 