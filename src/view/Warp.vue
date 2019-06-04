<template>
  <div class="warp">
    <header class="header">
      <div class="headercon">
        <img class="logo" src="../assets/img/jing-logo.png">
        <ul class="nav">
          <router-link to="/index">
            <li class="nava">Home</li>
          </router-link>
          <router-link to="/">
            <li class="navb">Design</li>
          </router-link>
          <router-link to="/about">
            <li class="navc">About</li>
          </router-link>
          <router-link to="/">
            <li class="navd">Contact</li>
          </router-link>
          <router-link to="/">
            <li class="nave">Blog</li>
          </router-link>
        </ul>
      </div>
    </header>
    <div class="warpcon">
      <router-view/>
    </div>
    <footer class="footer">
      <Divider>
        <p>技术支持</p>
      </Divider>
      <p>为了使您有更好的浏览体验，建议使用Chrome浏览器</p>
    </footer>
  </div>
</template>
<script>
export default {
  name: "admin"
};
</script>
<style lang="less" scoped>
.warp {
  .header {
    height: 119px;
    background-image: url("../assets/img/top-bg.png");
    .headercon {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav {
        width: 400px;
        height: 70px;
        justify-content: space-between;
        display: flex;
        li {
          width: 53px;
          height: 73px;
          background: url("../assets/img/nav-icons.png") no-repeat 0 0;
          padding-top: 53px;
          text-align: center;
          color: #938678;
          font-size: 14px;
          cursor: pointer;
        }
        .nava {
          background-position: -455px 2px;
          &:hover {
            background-position: -455px -85px;
          }
        }
        .navb {
          background-position: 5px 2px;
          &:hover {
            background-position: 9px -87px;
          }
        }
        .navc {
          background-position: -107px 2px;
          &:hover {
            background-position: -106px -86px;
          }
        }
        .navd {
          background-position: -224px 2px;
          &:hover {
            background-position: -222px -85px;
          }
        }
        .nave {
          background-position: -338px 2px;
          &:hover {
            background-position: -338px -85px;
          }
        }
      }
    }
  }
  .warpcon {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 25px;
  }
  .footer {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    padding-bottom: 20px;
    p {
      text-align: center;
      font-size: 12px;
      color: #8e6955;
    }
  }
  @media screen and (max-width: 1220px) {
    .header {
      .headercon {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .warpcon {
      width: 100%;
      padding: 25px;
    }
    .footer {
      width: 100%;
    }
  }
  @media only screen and (max-width: 992px) {
    .header {
      padding: 20px;
    }
    .warpcon {
      width: 100%;
      padding: 25px;
    }
  }
  @media only screen and (max-width: 680px) {
    .header {
      height: auto;
      background: #dfcfc5;
      padding: 20px;
      .headercon {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .logo {
          margin-bottom: 20px;
        }
        .nav {
          width: 100%;
          height: auto;
          flex-direction: column;
          justify-content: space-around;
          display: flex;
          li {
            width: 100%;
            line-height: 40px;
            height: 40px;
            padding-top: 0px;
            background: none;
            border-bottom: 1px solid #fff;
            &:hover {
              background: #c2a594;
              color: #fff;
            }
          }
        }
      }
    }
    .warpcon {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
