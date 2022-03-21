export default {
  pages: ["pages/index/index", "pages/chart/index", "pages/focus/index"],
  tabBar: {
    color: "#000",
    selectedColor: "#54c7ec",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "待办清单",
        iconPath: "./resources/icon/列表（未选中）.png",
        selectedIconPath: "./resources/icon/列表（选中）.png"
      },
      {
        pagePath: "pages/chart/index",
        text: "统计图表",
        iconPath: "./resources/icon/图表-折线图（未选中）.png",
        selectedIconPath: "./resources/icon/图表-折线图（选中）.png"
      },
      {
        pagePath: "pages/focus/index",
        text: "专注模式",
        iconPath: "./resources/icon/专注（未选中）.png",
        selectedIconPath: "./resources/icon/专注（选中）.png"
      }
    ]
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
};
