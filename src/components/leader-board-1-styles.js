import { css } from "lit-element";

const leaderboard1 = css`
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
      rgba(69, 154, 242, 0.1) 0deg 5deg,
      transparent 5deg 10deg
    ),
    linear-gradient(to right, #479ff4, #1f43c1);
  height: 100%;
  width: 100vw;
}

.dark-root-leaderboard-container {
  font-family: "Poppins", sans-serif;
  background-image: repeating-conic-gradient(
      from 30deg at 50% 12%,
      rgba(69, 154, 242, 0.02) 0deg 5deg,
      transparent 5deg 10deg
    ),
    linear-gradient(to right, #101e36, #101e36);
  height: 100%;
  width: 100vw;
}

.champions {
  display: flex;
  position: relative;
  top: 50px;
  width: 710px;
  height: 355px;
  justify-content: center;
}

.title {
  position: relative;
  top: -20px;
}

.avatar-winner-container {
  border-radius: 100%;
  width: 105px;
  height: 105px;
  background-color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark-avatar-winner-container {
  border-radius: 100%;
  width: 105px;
  height: 105px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-winner-container-current-user {
  border-radius: 100%;
  width: 105px;
  height: 105px;
  background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: grow;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}

.winner-crown {
  background-image: url("/components/assets/premium-quality.png");
  height: 38px;
  width: 38px;
  position: relative;
  top: -30px;
  right: -35px;
  background-position: center center;
  background-repeat: no-repeat;
}

.avatar-winner-content {
  position: absolute;
  border-radius: 100%;
  width: 91.3px;
  height: 91.3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  border-radius: 100%;
  width: 75px;
  height: 75px;
  background-color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark-avatar-container {
  border-radius: 100%;
  width: 75px;
  height: 75px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container-current-user {
  border-radius: 100%;
  width: 75px;
  height: 75px;
  background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: grow;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}

.avatar-content {
  border-radius: 100%;
  width: 65.2px;
  height: 65.2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#winner {
  position: absolute;
  width: 120px;
  top: 3.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#runner-up {
  position: absolute;
  width: 135px;
  top: 100px;
  left: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
}

#third-place {
  position: absolute;
  width: 135px;
  top: 120px;
  right: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
}

.cube {
  margin-top: 1rem;
  width: 220px;
  height: 250px;
  perspective: 350px;
  transform: rotateX(170deg);
}

.cube-winner {
  margin-top: 1rem;
  z-index: 1;
  width: 155px;
  height: 250px;
  perspective: 350px;
  transform: rotateX(170deg);
}

#runner-up .cube {
  transform: translateX(50px) rotateZ(180deg);
}

#third-place .cube {
  transform: translateX(-50px) rotateZ(180deg);
}

.side {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.front {
  transform: rotateX(10deg) translateY(-6px);
  background: linear-gradient(to bottom, #bdcdf0, #567dd8);
}

.dark-front {
  transform: rotateX(10deg) translateY(-6px);
  background: linear-gradient(to top, #172843 -25%, #475777);
}

.top {
  transform: rotateX(-67deg) translateY(250px);
  transform-origin: bottom;
  background: #eaf0fd;
}

.dark-top {
  transform: rotateX(-67deg) translateY(250px);
  transform-origin: bottom;
  background: #2a3f66;
}

.winner-podium-content {
  transform: rotateX(180deg);
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
}

.winner-podium-content .number {
  font-family: K2D;
  font-size: 95px;
  color: #ffffff;
  position: relative;
  top: -15%;
}

.runner-up-podium-content {
  transform: rotateX(180deg) rotateY(180deg);
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 120px;
}

.runner-up-podium-content .number {
  font-family: K2D;
  font-size: 47.5px;
  color: #ffffff;
  position: relative;
  top: -7%;
}

.third-place-podium-content {
  transform: rotateX(180deg) rotateY(180deg);
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 120px;
}

.third-place-podium-content .number {
  font-family: K2D;
  font-size: 23.75px;
  color: #ffffff;
  position: relative;
  top: -2%;
}

.point-chip {
  width: 70px;
  height: 25px;
  border-radius: 15px;
  background-color: #163476;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dark-point-chip {
  width: 70px;
  height: 25px;
  border-radius: 15px;
  background-color: #459af2;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.centered-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.rank-panel {
  z-index: 1;
  width: 540px;
  height: 352px;
  background-color: rgb(255, 255, 255);
  border-radius: 17px;
  position: relative;
  padding: 1.5rem 1em 1.5rem 1.5rem;
  margin-bottom: 53px;
}

.dark-rank-panel {
  z-index: 1;
  width: 540px;
  height: 352px;
  background-color: #203354;
  border-radius: 17px;
  position: relative;
  padding: 1.5rem 1em 1.5rem 1.5rem;
  margin-bottom: 53px;
}

.rank-list {
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding-right: 0.5rem;
}

.individual-rank {
  display: flex;
  align-items: center;
  width: 100%;
  height: 43px;
  border-radius: 7px;
  background-color: #d3e5f97a;
}

.individual-rank-current-user {
  display: flex;
  align-items: center;
  width: 100%;
  height: 43px;
  border-radius: 7px;
  background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
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

.text-semi-bold {
  font-weight: 900;
}

.text-medium {
  font-weight: 500;
}

.text-regular {
  font-weight: 400;
}

.text-12 {
  font-size: 12px;
}

.text-18 {
  font-size: 18px;
}

.text-24 {
  font-size: 24px;
}

.text-center {
  text-align: center;
}

@media only screen and (max-width: 540px) {
  .champions {
    display: flex;
    position: relative;
    top: 50px;
    width: 100%;
    height: 355px;
    justify-content: center;
  }

  #winner {
    position: absolute;
    width: 120px;
    top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #runner-up {
    position: absolute;
    width: 135px;
    top: 100px;
    left: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  #third-place {
    position: absolute;
    width: 135px;
    top: 120px;
    right: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .rank-panel {
    width: 100%;
    height: calc(100vh - 335px - 33px);
    background: #ffffff;
    border-radius: 17px 17px 0px 0px;
    padding: 1rem 0.5rem 1rem 1rem;
    margin-bottom: 0px;
  }

  .dark-rank-panel {
    width: 100%;
    height: calc(100vh - 335px - 33px);
    background: #203354;
    border-radius: 17px 17px 0px 0px;
    padding: 1rem 0.5rem 1rem 1rem;
    margin-bottom: 0px;
  }
}

@media only screen and (max-width: 450px) {
  .champions {
    display: flex;
    position: relative;
    top: 50px;
    width: 100%;
    height: 300px;
    justify-content: center;
  }

  .rank-panel {
    width: 100%;
    height: calc(100vh - 300px - 33px);
    background: #ffffff;
    border-radius: 17px 17px 0px 0px;
    padding: 1rem 0.5rem 1rem 1rem;
    margin-bottom: 0px;
  }

  .dark-rank-panel {
    width: 100%;
    height: calc(100vh - 300px - 33px);
    background: #203354;
    border-radius: 17px 17px 0px 0px;
    padding: 1rem 0.5rem 1rem 1rem;
    margin-bottom: 0px;
  }

  #runner-up {
    position: absolute;
    width: 135px;
    top: 73px;
    left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  #third-place {
    position: absolute;
    width: 135px;
    top: 90px;
    right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .cube-winner {
    margin-top: 1rem;
    z-index: 1;
    width: 120px;
    height: 250px;
    perspective: 350px;
    transform: rotateX(170deg);
  }

  .cube {
    margin-top: 1rem;
    width: 195px;
    height: 250px;
    perspective: 350px;
  }

  .runner-up-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 110px;
  }

  .third-place-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 110px;
  }

  .avatar-winner-container {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dark-avatar-winner-container {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-winner-container-current-user {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation-name: grow;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  .avatar-winner-content {
    position: absolute;
    border-radius: 100%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-container {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dark-avatar-container {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-container-current-user {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation-name: grow;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  .avatar-content {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .winner-crown {
    background-image: url("/components/assets/premium-quality.png");
    height: 26px;
    width: 26px;
    position: relative;
    top: -25px;
    right: -25px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .dark-point-chip {
    width: 55px;
    height: 22px;
    border-radius: 15px;
    background-color: #459af2;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .point-chip {
    width: 55px;
    height: 22px;
    border-radius: 15px;
    background-color: #163476;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text-12 {
    font-size: 10px;
  }

  .text-18 {
    font-size: 16px;
  }

  .text-24 {
    font-size: 22px;
  }
}

@media only screen and (max-width: 375px) {
  #runner-up {
    position: absolute;
    width: 95px;
    top: 73px;
    left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  #third-place {
    position: absolute;
    width: 95px;
    top: 90px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .cube-winner {
    margin-top: 1rem;
    z-index: 1;
    width: 120px;
    height: 250px;
    perspective: 350px;
    transform: rotateX(170deg);
  }

  .cube {
    margin-top: 1rem;
    width: 170px;
    height: 250px;
    perspective: 350px;
  }

  .runner-up-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 95px;
  }

  .third-place-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 95px;
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
  .text-12 {
    font-size: 10px;
  }

  .root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background-image: repeating-conic-gradient(
        from 30deg at 50% 120px,
        rgba(69, 154, 242, 0.1) 0deg 5deg,
        transparent 5deg 10deg
      ),
      linear-gradient(to right, #479ff4, #1f43c1);
    height: 100%;
    width: 100vw;
  }

  .dark-root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background-image: repeating-conic-gradient(
        from 30deg at 50% 12%,
        rgba(69, 154, 242, 0.02) 0deg 5deg,
        transparent 5deg 10deg
      ),
      linear-gradient(to right, #101e36, #101e36);
    height: 100%;
    width: 100vw;
  }

  .champions {
    display: flex;
    position: relative;
    top: 50px;
    width: 400px;
    height: 300px;
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

  .dark-rank-panel {
    width: 410px;
    height: 352px;
    background: #203354;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
    margin-bottom: 53px;
  }

  #runner-up {
    position: absolute;
    width: 135px;
    top: 73px;
    left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  #third-place {
    position: absolute;
    width: 135px;
    top: 90px;
    right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .cube-winner {
    margin-top: 1rem;
    z-index: 1;
    width: 120px;
    height: 250px;
    perspective: 350px;
    transform: rotateX(170deg);
  }

  .cube {
    margin-top: 1rem;
    width: 195px;
    height: 250px;
    perspective: 350px;
  }

  .runner-up-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 110px;
  }

  .third-place-podium-content {
    transform: rotateX(180deg) rotateY(180deg);
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 110px;
  }

  .avatar-winner-container {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dark-avatar-winner-container {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-winner-container-current-user {
    border-radius: 100%;
    width: 69px;
    height: 69px;
    background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation-name: grow;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  .avatar-winner-content {
    position: absolute;
    border-radius: 100%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-container {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dark-avatar-container {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-container-current-user {
    border-radius: 100%;
    width: 46px;
    height: 46px;
    background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation-name: grow;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }

  .avatar-content {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .winner-crown {
    background-image: url("/components/assets/premium-quality.png");
    height: 26px;
    width: 26px;
    position: relative;
    top: -20px;
    right: -25px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .dark-point-chip {
    width: 55px;
    height: 22px;
    border-radius: 15px;
    background-color: #459af2;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .point-chip {
    width: 55px;
    height: 22px;
    border-radius: 15px;
    background-color: #163476;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text-12 {
    font-size: 10px;
  }

  .text-18 {
    font-size: 16px;
  }

  .text-24 {
    font-size: 22px;
  }
}

@media only screen and (max-height: 540px) and (min-width: 700px) {
  .dark-root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background-image: repeating-conic-gradient(
        from 30deg at 50% 12%,
        rgba(69, 154, 242, 0.02) 0deg 5deg,
        transparent 5deg 10deg
      ),
      linear-gradient(to right, #101e36, #101e36);
    height: 100%;
    width: 100vw;
  }

  .rank-panel {
    width: 410px;
    height: 352px;
    background: #ffffff;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
    margin-bottom: 53px;
  }

  .dark-rank-panel {
    width: 410px;
    height: 352px;
    background: #203354;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
    margin-bottom: 53px;
  }
}

@media only screen and (min-height: 812) {
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

export const leaderBoard1Styles = [leaderboard1];
