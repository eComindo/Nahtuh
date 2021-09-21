import { css } from "lit-element";

const leaderboard3 = css`
  @keyframes grow {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 0px;
    color: transparent;
  }

  ::-webkit-scrollbar-track {
    box-shadow: transparent;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    color: transparent;
  }

  .root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background-image: repeating-conic-gradient(
        from 30deg at 50% 120px,
        rgba(139 189 241 / 10%) 0deg 5deg,
        transparent 5deg 10deg
      ),
      linear-gradient(to right, #c6dfff, #c6dfff);
    height: 100%;
    width: 100vw;
  }

  .decoration {
    display: flex;
    width: 600px;
    height: 360px;
    flex-direction: column;
    align-items: center;
  }

  .title {
    padding-top: 15.15px;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #4f698a;
  }

  .clouds {
    width: 100%;
    height: 100%;
  }

  .cloud1 {
    width: 261px;
    height: 111px;
    background-image: url("/components/assets/cloud1.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    top: 10px;
    right: 20px;
  }

  .cloud2 {
    width: 426px;
    height: 191px;
    background-image: url("/components/assets/cloud2.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    top: 0px;
    left: 250px;
  }

  .cloud3 {
    width: 206px;
    height: 109px;
    background-image: url("/components/assets/cloud3.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    top: -40px;
    right: 5px;
  }

  .winner {
    width: 200px;
    height: 400px;
    display: flex;
    position: absolute;
    top: 50px;
    flex-direction: column;
    align-items: center;
  }

  .runner-up {
    width: 200px;
    height: 400px;
    display: flex;
    position: relative;
    top: -295px;
    right: 150px;
    flex-direction: column;
    align-items: center;
  }

  .third-place {
    width: 200px;
    height: 400px;
    display: flex;
    position: relative;
    top: -635px;
    left: 150px;
    flex-direction: column;
    align-items: center;
  }

  .baloon {
    width: 138px;
    height: 157px;
    -webkit-border-radius: 75px 75px 80px 80px / 75px 75px 108px 108px;
    border-radius: 60% 60% 60% 60% / 50% 50% 70% 70%;
    box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .baloon-bottom {
    width: 29px;
    height: 29px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    position: relative;
    top: 15px;
  }

  .point-chip {
    width: 81px;
    height: 28.5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 14.6887px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .centered-container {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .rank-panel {
    z-index: 1;
    width: 540px;
    height: 352px;
    background: #ffffff;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
    margin-bottom: 53px;
  }

  .rank-list {
    overflow: scroll;
    width: 100%;
    height: 100%;
    padding-right: 0.5rem;
  }

  .individual-rank {
    z-index: -1;
    display: flex;
    align-items: center;
    width: 100%;
    height: 43px;
    border-radius: 7px;
    background-color: #d3e5f97a;
  }

  .individual-rank-current-user {
    z-index: -1;
    display: flex;
    align-items: center;
    width: 100%;
    height: 43px;
    border-radius: 7px;
    background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
  }

  .rank-content {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .participant-rank {
    display: flex;
    justify-content: center;
    width: 15%;
  }

  .participant {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 65%;
  }

  .participant-avatar {
    width: 29px;
    height: 29px;
    border-radius: 100%;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .participant-point {
    display: flex;
    justify-content: center;
    width: 20%;
  }

  .text-white {
    color: #ffffff;
  }

  .text-dark-blue {
    color: #071755;
  }

  .text-12 {
    font-size: 12px;
  }

  .cu-animation {
    animation-name: grow;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  @media only screen and (max-width: 550px) {
    .text-12 {
      font-size: 10px;
    }

    .root-leaderboard-container {
      font-family: "Poppins", sans-serif;
      background-image: repeating-conic-gradient(
          from 30deg at 50% 120px,
          rgba(139 189 241 / 10%) 0deg 5deg,
          transparent 5deg 10deg
        ),
        linear-gradient(to right, #c6dfff, #c6dfff);
      height: 100%;
      width: 100vw;
    }

    .cloud1 {
      width: 240px;
      background-image: url("/components/assets/cloud1.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -10px;
      right: 60px;
    }

    .cloud2 {
      width: 65vw;
      background-image: url("/components/assets/cloud4.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-clip: content-box;
      position: relative;
      top: -40px;
      left: 148px;
    }

    .cloud3 {
      width: 190.5px;
      background-image: url("/components/assets/cloud3.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -120px;
      right: 50px;
    }

    .decoration {
      display: flex;
      width: 100%;
      height: 335px;
      flex-direction: column;
      align-items: center;
    }

    .winner {
      width: 118px;
      height: 400px;
      display: flex;
      position: absolute;
      top: 50px;
      flex-direction: column;
      align-items: center;
    }

    .runner-up {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -255px;
      right: 110px;
      flex-direction: column;
      align-items: center;
    }

    .third-place {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -568px;
      left: 110px;
      flex-direction: column;
      align-items: center;
    }

    .baloon {
      width: 112px;
      height: 127px;
      -webkit-border-radius: 75px 75px 80px 80px / 75px 75px 108px 108px;
      border-radius: 60% 60% 60% 60% / 50% 50% 70% 70%;
      box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .baloon-bottom {
      width: 23px;
      height: 23px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
    }

    .point-chip {
      width: 60px;
      height: 21px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14.6887px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 540px) {
    .rank-panel {
      width: 94%;
      height: calc(100vh - 335px - 33px);
      background: #ffffff;
      border-radius: 17px 17px 0px 0px;
      padding: 1rem 0.5rem 1rem 1rem;
    }
  }

  @media only screen and (max-width: 540px) and (max-height: 720px) {
    .cloud1 {
      width: 240px;
      background-image: url("/components/assets/cloud1.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: 0vw;
      right: 60px;
    }

    .cloud2 {
      width: 65vw;
      background-image: url("/components/assets/cloud4.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-clip: content-box;
      position: relative;
      top: -40px;
      left: 50vw;
    }

    .cloud3 {
      width: 190.5px;
      background-image: url("/components/assets/cloud3.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -120px;
      right: 2vw;
    }
  }

  @media only screen and (max-width: 375px) {
    .cloud1 {
      width: 240px;
      background-image: url("/components/assets/cloud1.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: 20px;
      right: 60px;
    }

    .cloud2 {
      width: 65vw;
      background-image: url("/components/assets/cloud4.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-clip: content-box;
      position: relative;
      top: -3px;
      left: 34vw;
    }

    .cloud3 {
      width: 190.5px;
      background-image: url("/components/assets/cloud3.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -83px;
      right: 95px;
    }

    .winner {
      width: 118px;
      height: 400px;
      display: flex;
      position: absolute;
      top: 50px;
      flex-direction: column;
      align-items: center;
    }

    .runner-up {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -240px;
      right: 90px;
      flex-direction: column;
      align-items: center;
    }

    .third-place {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -555px;
      left: 90px;
      flex-direction: column;
      align-items: center;
    }
  }

  @media only screen and (max-height: 500px) and (min-width: 705px) {
    .root-leaderboard-container {
      font-family: "Poppins", sans-serif;
      background-image: repeating-conic-gradient(
          from 30deg at 50% 120px,
          rgba(139 189 241 / 10%) 0deg 5deg,
          transparent 5deg 10deg
        ),
        linear-gradient(to right, #c6dfff, #c6dfff);
      height: 100%;
      width: 100vw;
    }

    .rank-panel {
      width: 380px;
      height: 352px;
      background: #ffffff;
      border-radius: 17px;
      padding: 1.5rem 1rem 1.5rem 1.5rem;
      margin-bottom: 53px;
    }
  }

  @media only screen and (min-height: 1290px) {
    .root-leaderboard-container {
      font-family: "Poppins", sans-serif;
      background-image: repeating-conic-gradient(
          from 30deg at 50% 120px,
          rgba(139 189 241 / 10%) 0deg 5deg,
          transparent 5deg 10deg
        ),
        linear-gradient(to right, #c6dfff, #c6dfff);
      height: 100vh;
      width: 100vw;
    }
  }

  @media only screen and (max-height: 450px) {
    .root-leaderboard-container {
      font-family: "Poppins", sans-serif;
      background-image: repeating-conic-gradient(
          from 30deg at 50% 120px,
          rgba(139 189 241 / 10%) 0deg 5deg,
          transparent 5deg 10deg
        ),
        linear-gradient(to right, #c6dfff, #c6dfff);
      height: 100%;
      width: 100vw;
    }

    .text-12 {
      font-size: 10px;
    }

    .cloud1 {
      width: 261px;
      height: 111px;
      background-image: url("/components/assets/cloud1.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: 10px;
      left: 35vh;
    }

    .cloud2 {
      width: 426px;
      height: 191px;
      background-image: url("/components/assets/cloud2.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -25px;
      left: 295px;
    }

    .cloud3 {
      width: 206px;
      height: 109px;
      background-image: url("/components/assets/cloud3.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -110px;
      left: 25vh;
    }

    .decoration {
      display: flex;
      width: 100%;
      height: 315px;
      flex-direction: column;
      align-items: center;
    }

    .winner {
      width: 118px;
      height: 400px;
      display: flex;
      position: absolute;
      top: 50px;
      flex-direction: column;
      align-items: center;
    }

    .runner-up {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -240px;
      right: 120px;
      flex-direction: column;
      align-items: center;
    }

    .third-place {
      width: 118px;
      height: 400px;
      display: flex;
      position: relative;
      top: -570px;
      left: 110px;
      flex-direction: column;
      align-items: center;
    }

    .baloon {
      width: 118px;
      height: 131px;
      -webkit-border-radius: 75px 75px 80px 80px / 75px 75px 108px 108px;
      border-radius: 60% 60% 60% 60% / 50% 50% 70% 70%;
      box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .baloon-bottom {
      width: 29px;
      height: 29px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 14px -45px 0 rgba(0, 0, 0, 0.15);
    }

    .point-chip {
      width: 60px;
      height: 21px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14.6887px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .rank-panel {
      width: 410px;
      height: 352px;
      background: #ffffff;
      border-radius: 17px;
      padding: 1.5rem 1rem 1.5rem 1.5rem;
      margin-bottom: 53px;
    }
  }

  @media only screen and (max-height: 375px) {
    .cloud2 {
      width: 326px;
      background-image: url("/components/assets/cloud2.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: -25px;
      left: 40vw;
    }
  }

  @media only screen and (min-height: 807) {
    .dark-root-leaderboard-container {
      height: 100vw;
    }

    .root-leaderboard-container {
      height: 100vw;
    }
  }

  @media only screen and (min-height: 949px) and (max-width: 1010px) {
    .dark-root-leaderboard-container {
      height: 100vw;
    }

    .root-leaderboard-container {
      height: 100vw;
    }
  }

`;

export const leaderBoard3Styles = [leaderboard3];
