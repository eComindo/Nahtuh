import { css } from "lit-element";

const participants = css`
  #participant-count {
    margin: 1rem;
    font-size: 14px;
    display: none;
  }
  #participant-count span {
    font-weight: 600;
  }
  #participant-count.active {
    display: block;
  }
  #participant-list {
    display: none;
    align-items: flex-start;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding-right: 0.5rem;
    margin: 0 0.5rem 1rem 1rem;
    overflow-y: auto;
  }
  #participant-list.active {
    display: grid;
  }
  @media (min-width: 740px) {
    #participant-list {
      display: grid;
      margin: 0;
      margin-right: 0.75rem;
      padding: 0 0.75rem 1.5rem 1.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    #participant-count {
      margin: 1.5rem 0 1rem 2rem;
      display: block;
    }
  }
  @media only screen and (min-width: 1024px) {
    #participant-list {
      padding: 0 1.25rem 2rem 2rem;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.5rem;
    }
  }
`;

const activityInfo = css`
  .activity-info-container {
    height: auto;
  }
  .activity-info-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    color: #071755;
  }
  #activity-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0.5rem 0;
  }
  #activity-info-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
  }
  #activity-name,
  .log-header {
    flex: 1 1 auto;
    font-size: 18px;
    font-weight: 500;
  }
  #event-id,
  #event-host {
    margin-top: 0.5rem;
    font-size: 12px;
    font-weight: 400;
  }
  #event-id span,
  #event-host span {
    font-weight: 500;
    line-height: 18px;
  }
  #event-host {
    display: flex;
    align-items: center;
  }
  #activity-thumbnail {
    width: 6rem;
    height: 6rem;
    border-radius: 8px;
    margin-right: 0.5rem;
  }
  #action-btn {
    padding: auto;
    border-radius: 999px;
    text-align: center;
    cursor: pointer;
  }
  @media (min-width: 740px) {
    .activity-info-container {
      flex: 2 2 70%;
      margin-right: 1rem;
      padding-bottom: 1.5rem;
    }
    #activity-info-wrapper {
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: 0;
    }
    .activity-info-header {
      flex-direction: row;
      padding: 1.5rem 2rem;
    }
    #activity-header {
      margin: 12px 1rem;
      width: auto;
    }
    #action-btn {
      margin: auto 0;
      margin-left: auto;
    }
    #activity-thumbnail {
      width: 8rem;
      height: 8rem;
      border-radius: 16px;
      margin-right: 0;
    }
    #activity-name,
    .log-header {
      margin-bottom: 1rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    .activity-info-container {
      height: calc(100vh - 6rem);
      margin-right: 2rem;
      flex-basis: 75%;
      padding-bottom: 2rem;
    }
  }
`;

const components = css`
  .bar {
    text-align: center;
    color: #fff;
    padding: 2px;
    font-size: 12px;
    font-weight: 400;
  }
  .btn-participant {
    width: 100%;
  }
  .btn-host {
    width: 45%;
  }
  .bar-primary {
    background: var(--colorPrimary);
  }
  .bar-danger {
    background: var(--colorDanger);
  }
  .gap {
    margin-right: 0.25rem;
  }
  .action-button-container {
    display: flex;
  }  
  .btn-width {
    width: 300px;
  }
  .btn-primary {
    background: linear-gradient(90deg, var(--colorPrimary) 3.21%, var(--colorSecondary) 105.94%);
    color: #ffffff;
  }
  .btn {
    -moz-border-radius: 9999px;
    -webkit-border-radius: 9999px;
    border-radius: 9999px;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    padding: 0.75rem 0;
    text-align: center;
    width: 150px;
  }
  .btn-primary {
    background: linear-gradient(90deg, var(--colorPrimary) 3.21%, var(--colorSecondary) 105.94%);
    color: #ffffff;
  }
  .btn-secondary,
  .user-block {
    --hack: 10000%;
    --op: 0.1;
    background: linear-gradient(
      to bottom,
      var(--colorPrimary) calc((var(--op) - 1) * var(--hack)),
      transparent calc(var(--op) * var(--hack))
    );
    color: #071755;
  }
  .btn-invite {
    --hack: 10000%;
    --op: 0.3;
    background: linear-gradient(
      to bottom,
      var(--colorPrimary) calc((var(--op) - 1) * var(--hack)),
      transparent calc(var(--op) * var(--hack))
    );
    color: #071755;
  }
  .btn:hover,
  .tab:hover {
    filter: brightness(0.9);
  }
  .user-block {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 14px;
  }
  .user-block span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-current {
    background: var(--colorPrimary);
    color: #fff;
  }
  .user-avatar {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
  }
  .tabs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: #f4f8fd;
  }
  .tab {
    background: white;
    text-align: center;
    padding: 10px;
    font-size: 12px;
    cursor: pointer;
  }
  .tab.active {
    font-weight: 600;
    color: var(--colorPrimary);
  }
  @media (min-width: 740px) {
    .bar {
      padding: 8px;
    }
    .tabs {
      display: none;
    }
    .btn-participant {
      width: 150px;
    }
    .btn-host {
      width: 150px;
    }
    .header-container {
      width: 75%;
    }
    .header-participant-container {
      width: 100%;
    }
  }
  @media only screen and (min-width: 1024px) {
    .user-block {
      padding: 0.75rem;
    }
  }
`;

const countdown = css`
  #countdown {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
  }
  #timer {
    width: 12rem;
    height: 12rem;
    border-radius: 100%;
    color: #fff;
    border: 4px solid #fff;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 96px;
    font-weight: 400;
  }
`;

const logs = css`
  .logs-container {
    padding: 1rem;
    display: none;
  }
  .logs-container.active {
    display: flex;
  }
  .logs-header {
    display: none;
  }
  .logs-content {
    margin: 0.5rem 0;
    overflow-y: auto;
    flex: 1 1 auto;
  }
  .log {
    margin-top: 0.5rem;
    font-size: 12px;
    line-height: 18px;
  }
  .log-primary {
    color: var(--colorPrimary);
  }
  .log-danger {
    color: var(--colorDanger);
  }
  .log span {
    font-weight: 600;
  }
  @media (min-width: 740px) {
    .logs-container {
      display: flex;
      flex: 1 1 30%;
      padding: 1.5rem 0.75rem 1.5rem 1.5rem;
      height: calc(100vh - 5rem);
    }
    .logs-header {
      display: block;
    }
    .logs-content {
      padding-right: 0.75rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    .logs-container {
      flex-basis: 25%;
      padding: 2rem 0.5rem 2rem 2rem;
      height: calc(100vh - 8rem);
    }
    .logs-content {
      padding-right: 1.5rem;
    }
  }
`;

const containers = css`
  :host {
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #0717551a;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(7, 23, 85, 0.1);
  }
  .root-lobby-container {
    background: #f4f8fd;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .lobby-container {
    display: flex;
    flex-direction: column;
    font-family: Poppins, inherit;
    height: 100vh;
    margin: 0;
  }
  .activity-info-container,
  .logs-container {
    background: #f4f8fd;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 740px) {
    .activity-info-container,
    .logs-container {
      border-radius: 16px;
      background: #fff;
      -moz-box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
      -webkit-box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
      box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
    }
    .lobby-container {
      flex-direction: row;
      margin: 1rem;
      height: calc(100vh - 2rem);
    }
  }
  @media only screen and (min-width: 1024px) {
    .lobby-container {
      margin: 2rem;
      height: calc(100vh - 4rem);
    }
  }
`;

export const lobbyStyles = [containers, components, activityInfo, participants, logs, countdown];
