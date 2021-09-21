import { css } from "lit-element";

const leaderboard2 = css`
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
  background: linear-gradient(96.18deg, #479ff4 3.21%, #1f43c1 105.94%);
  height: 100vh;
  width: 100vw;
}

.dark-root-leaderboard-container {
  font-family: "Poppins", sans-serif;
  background: #11213d;
  height: 100vh;
  width: 100vw;
}

.title {
  padding-top: 40.15px;
  padding-bottom: 40.15px;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
}

.centered-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.rank-panel {
  width: 580px;
  height: calc(100vh - 107.28px - 53px - 75px);
  background: #ffffff;
  border-radius: 17px;
  padding: 1.5rem 1em 1.5rem 1.5rem;
}

.dark-rank-panel {
  width: 580px;
  height: calc(100vh - 107.28px - 53px - 75px);
  background: #203354;
  border-radius: 17px;
  padding: 1.5rem 1rem 1.5rem 1.5rem;
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

.dark-individual-rank {
  display: flex;
  align-items: center;
  width: 100%;
  height: 43px;
  border-radius: 7px;
  background-color: #2c436b;
}

.individual-rank-progress-bar {
  z-index: 0;
  position: relative;
  top: 0px;
  left: 0px;
  background: linear-gradient(96.18deg, #479ff478 3.21%, #1f43c178 105.94%);
  height: 100%;
  border-radius: 7px;
}

.individual-rank-progress-bar-current-user {
  z-index: 0;
  position: relative;
  top: 0px;
  left: 0px;
  background: linear-gradient(96.18deg, #f4e347 3.21%, #f8851c 105.94%);
  height: 100%;
  border-radius: 7px;
}

.rank-content {
  display: flex;
  align-items: center;
  height: 100%;
  width: 570px;
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

@media only screen and (max-width: 550px) {
  .text-12 {
    font-size: 10px;
  }
}

@media only screen and (max-width: 540px) {
  .rank-panel {
    width: 94%;
    height: calc(100vh - 107.28px - 33px);
    background: #ffffff;
    border-radius: 17px 17px 0 0;
    padding: 1rem 0.5rem 1rem 1rem;
  }

  .dark-rank-panel {
    width: 94%;
    height: calc(100vh - 107.28px - 33px);
    background: #203354;
    border-radius: 17px 17px 0 0;
    padding: 1rem 0.5rem 1rem 1rem;
  }

  .rank-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: calc(100vw - 35px);
  }
}

@media only screen and (max-height: 500px) and (min-width: 705px) {
  .rank-panel {
    width: 380px;
    height: 350px;
    background: #ffffff;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
  }

  .dark-rank-panel {
    width: 380px;
    height: 350px;
    background: #203354;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
  }

  .rank-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: 370px;
  }
}

@media only screen and (max-height: 450px) {
  .root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background: linear-gradient(96.18deg, #479ff4 3.21%, #1f43c1 105.94%);
    height: 100%;
    width: 100vw;
    padding-bottom: 2rem;
  }

  .dark-root-leaderboard-container {
    font-family: "Poppins", sans-serif;
    background: #11213d;
    height: 100%;
    width: 100vw;
    padding-bottom: 2rem;
  }

  .rank-panel {
    width: 410px;
    height: 325px;
    background: #ffffff;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
  }

  .dark-rank-panel {
    width: 410px;
    height: 325px;
    background: #203354;
    border-radius: 17px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
  }

  .rank-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: 400px;
  }
}

`;

export const leaderBoard2Styles = [leaderboard2];
