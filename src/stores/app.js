import Cookies from "js-cookie";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sidebar: {
        opened: Cookies.get("sidebarStatus")
          ? !!+Cookies.get("sidebarStatus")
          : true,
        withoutAnimation: false,
        hide: false,
      },
      device: "desktop",
      size: Cookies.get("size") || "default",
    };
  },
  actions: {
    async toggleSideBar() {
      if (this.sidebar.hide) {
        return false;
      }
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
    async closeSideBar({ withoutAnimation }) {
      Cookies.set("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    async toggleDevice(device) {
      this.device = device;
    },
    async setSize(size) {
      this.size = size;
      Cookies.set("size", size);
    },
    async toggleSideBarHide(status) {
      this.sidebar.hide = status;
    },
  },
});

// import Cookies from "js-cookie";

// export const useAppStore = defineStore("app", () => {
//   const sidebar = reactive({
//     opened: Cookies.get("sidebarStatus")
//       ? !!+Cookies.get("sidebarStatus")
//       : true,
//     withoutAnimation: false,
//     hide: false,
//   });

//   const device = ref("desktop");
//   const size = ref(Cookies.get("size") || "default");

//   async function toggleSideBar() {
//     if (sidebar.hide) {
//       return false;
//     }
//     sidebar.opened = !sidebar.opened;
//     sidebar.withoutAnimation = false;
//     if (sidebar.opened) {
//       Cookies.set("sidebarStatus", 1);
//     } else {
//       Cookies.set("sidebarStatus", 0);
//     }
//   }
//   async function closeSideBar({ withoutAnimation }) {
//     Cookies.set("sidebarStatus", 0);
//     sidebar.opened = false;
//     sidebar.withoutAnimation = withoutAnimation;
//   }
//   async function toggleDevice(newDevice) {
//     device.value = newDevice;
//   }
//   async function setSize(newSize) {
//     size.value = newSize;
//     Cookies.set("size", newSize);
//   }
//   async function toggleSideBarHide(status) {
//     sidebar.hide = status;
//   }

//   return {
//     sidebar,
//     device,
//     size,
//     toggleSideBar,
//     closeSideBar,
//     toggleDevice,
//     setSize,
//     toggleSideBarHide,
//   };
// });
