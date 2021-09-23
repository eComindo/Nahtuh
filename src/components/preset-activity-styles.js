import { css } from "lit-element";

export const presetStyles = css`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  html {
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }
  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    margin: 0;
  }

  body {
    font-family: Poppins, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }

  hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
  }

  abbr[title] {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp,
  pre {
    font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  small {
    font-size: 80%;
  }

  /**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /*
Tabular data
============
*/

  /**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

  table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */
  }

  /*
Forms
=====
*/

  /**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
Remove the inheritance of text transform in Edge and Firefox.
1. Remove the inheritance of text transform in Firefox.
*/

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
Correct the inability to style clickable types in iOS and Safari.
*/

  button,
  [type="button"] {
    -webkit-appearance: button;
  }

  legend {
    padding: 0;
  }

  /**
Add the correct vertical alignment in Chrome and Firefox.
*/

  progress {
    vertical-align: baseline;
  }

  /**
Correct the cursor style of increment and decrement buttons in Safari.
*/

  /**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /*
Add the correct display in Chrome and Safari.
*/

  summary {
    display: list-item;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  button {
    background-color: transparent;
    background-image: none;
  }

  fieldset {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 1 */
    line-height: 1.5; /* 2 */
  }

  body {
    font-family: inherit;
    line-height: inherit;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box; /* 1 */
    border-width: 0; /* 2 */
    border-style: solid; /* 2 */
    border-color: currentColor; /* 2 */
  }

  hr {
    border-top-width: 1px;
  }

  img {
    border-style: solid;
  }

  textarea {
    resize: vertical;
  }

  input::-moz-placeholder,
  textarea::-moz-placeholder {
    opacity: 1;
    color: #9ca3af;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    opacity: 1;
    color: #9ca3af;
  }

  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: #9ca3af;
  }

  button {
    cursor: pointer;
  }

  /**
 * Override legacy focus reset from Normalize with modern Firefox focus styles.
 *
 * This is actually an improvement over the new defaults in Firefox in our testing,
 * as it triggers the better focus styles even for links, which still use a dotted
 * outline in Firefox by default.
 */

  table {
    border-collapse: collapse;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /**
 * Reset links to optimize for opt-in styling instead of
 * opt-out.
 */

  a {
    color: inherit;
    text-decoration: inherit;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block; /* 1 */
    vertical-align: middle; /* 2 */
  }

  /**
 * Constrain images and videos to the parent width and preserve
 * their intrinsic aspect ratio.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  [hidden] {
    display: none;
  }

  *,
  ::before,
  ::after {
    --tw-border-opacity: 1;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  }

  [type="text"],
  [type="url"],
  [type="search"],
  [type="time"],
  textarea,
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0px;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  [type="text"]:focus,
  [type="url"]:focus,
  [type="search"]:focus,
  [type="time"]:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: #2563eb;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    border-color: #2563eb;
  }

  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #6b7280;
    opacity: 1;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #6b7280;
    opacity: 1;
  }

  input::placeholder,
  textarea::placeholder {
    color: #6b7280;
    opacity: 1;
  }

  select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  [type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    color: #2563eb;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
  }

  [type="radio"] {
    border-radius: 100%;
  }

  [type="radio"]:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: #2563eb;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }

  [type="radio"]:checked {
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  [type="radio"]:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  }

  [type="radio"]:checked:hover,
  [type="radio"]:checked:focus {
    border-color: transparent;
    background-color: currentColor;
  }

  [type="file"] {
    background: unset;
    border-color: inherit;
    border-width: 0;
    border-radius: 0;
    padding: 0;
    font-size: unset;
    line-height: inherit;
  }

  [type="file"]:focus {
    outline: 1px auto -webkit-focus-ring-color;
  }

  .btn {
    cursor: pointer;
    border-radius: 9999px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      -webkit-backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-rounded {
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    align-items: center;
    justify-content: center;
  }

  .btn-primary {
    background: linear-gradient(90deg, var(--colorPrimary) 3.21%, var(--colorSecondary) 105.94%);
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
    --tw-blur: var(--tw-empty, /*!*/ /*!*/);
    --tw-brightness: var(--tw-empty, /*!*/ /*!*/);
    --tw-contrast: var(--tw-empty, /*!*/ /*!*/);
    --tw-grayscale: var(--tw-empty, /*!*/ /*!*/);
    --tw-hue-rotate: var(--tw-empty, /*!*/ /*!*/);
    --tw-invert: var(--tw-empty, /*!*/ /*!*/);
    --tw-saturate: var(--tw-empty, /*!*/ /*!*/);
    --tw-sepia: var(--tw-empty, /*!*/ /*!*/);
    --tw-drop-shadow: var(--tw-empty, /*!*/ /*!*/);
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate)
      var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  }

  .btn-primary:hover {
    --tw-brightness: brightness(0.9);
  }

  .btn-secondary {
    --hack: 10000%;
    --op: 0.1;
    background: linear-gradient(
      to bottom,
      var(--colorPrimary) calc((var(--op) - 1) * var(--hack)),
      transparent calc(var(--op) * var(--hack))
    );
    color: #071755;
  }

  .btn-secondary:hover {
    --op: 0.2;
  }

  .btn-danger {
    background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }

  .btn-danger:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(220, 38, 38, var(--tw-bg-opacity));
  }

  .input-form {
    border-radius: 9999px;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(209, 213, 219, var(--tw-border-opacity));
  }

  .input-form:focus {
    border-color: var(--colorPrimary);
  }

  .input-form {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1.25;
  }

  .input-form:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }

  svg.placeholder .fill-this {
    fill: var(--colorPrimary);
  }

  .modal {
    transition: opacity 0.25s ease;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 30;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
  }

  .modal-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
    opacity: 0.5;
  }

  .modal-container {
    z-index: 50;
    margin: 1.5rem auto;
    width: 91.666667%;
    overflow-y: auto;
    border-radius: 20px;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  @media (min-width: 768px) {
    .modal-container {
      max-width: 28rem;
    }
  }

  .modal-close-icon {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 50;
    margin-top: 1rem;
    margin-right: 1rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }

  .bg-secondary {
    --hack: 10000%;
    --op: 0.1;
    background: linear-gradient(
      to bottom,
      var(--colorPrimary) calc((var(--op) - 1) * var(--hack)),
      transparent calc(var(--op) * var(--hack))
    );
    color: #071755;
  }

  .pointer-events-none {
    pointer-events: none;
  }

  .visible {
    visibility: visible;
  }

  .static {
    position: static;
  }

  .absolute {
    position: absolute;
  }

  .relative {
    position: relative;
  }

  .top-0 {
    top: 0px;
  }

  .right-0 {
    right: 0px;
  }

  .bottom-0 {
    bottom: 0px;
  }

  .z-10 {
    z-index: 10;
  }

  .z-20 {
    z-index: 20;
  }

  .z-50 {
    z-index: 50;
  }

  .my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .mr-2 {
    margin-right: 0.5rem;
  }

  .mb-1 {
    margin-bottom: 0.25rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .ml-6 {
    margin-left: 1.5rem;
  }

  .block {
    display: block;
  }

  .flex {
    display: flex;
  }

  .table {
    display: table;
  }

  .hidden {
    display: none;
  }

  .h-40 {
    height: 10rem;
  }

  .h-full {
    height: 100%;
  }

  .w-20 {
    width: 5rem;
  }

  .w-full {
    width: 100%;
  }

  .flex-1 {
    flex: 1 1 0%;
  }

  .flex-shrink {
    flex-shrink: 1;
  }

  .border-collapse {
    border-collapse: collapse;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .resize-none {
    resize: none;
  }

  .resize {
    resize: both;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .gap-8 {
    gap: 2rem;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .rounded-full {
    border-radius: 9999px;
  }

  .rounded-card {
    border-radius: 20px;
  }

  .border {
    border-width: 1px;
  }

  .border-dashed {
    border-style: dashed;
  }

  .border-gray-300 {
    --tw-border-opacity: 1;
    border-color: rgba(209, 213, 219, var(--tw-border-opacity));
  }

  .object-contain {
    -o-object-fit: contain;
    object-fit: contain;
  }

  .p-2 {
    padding: 0.5rem;
  }

  .p-8 {
    padding: 2rem;
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .py-1\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .pt-2 {
    padding-top: 0.5rem;
  }

  .pb-4 {
    padding-bottom: 1rem;
  }

  .text-left {
    text-align: left;
  }

  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  input[type="radio"] {
    color: var(--colorSecondary);
  }

  input[type="radio"]:focus {
    --tw-ring-color: var(--colorPrimary);
  }

  .font-normal {
    font-weight: 400;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-black {
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
  }

  .text-gray-400 {
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }

  .text-pink-400 {
    --tw-text-opacity: 1;
    color: rgba(244, 114, 182, var(--tw-text-opacity));
  }

  .underline {
    text-decoration: underline;
  }

  .opacity-0 {
    opacity: 0;
  }

  *,
  ::before,
  ::after {
    --tw-shadow: 0 0 #0000;
  }

  *,
  ::before,
  ::after {
    --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
  }

  .filter {
    --tw-blur: var(--tw-empty, /*!*/ /*!*/);
    --tw-brightness: var(--tw-empty, /*!*/ /*!*/);
    --tw-contrast: var(--tw-empty, /*!*/ /*!*/);
    --tw-grayscale: var(--tw-empty, /*!*/ /*!*/);
    --tw-hue-rotate: var(--tw-empty, /*!*/ /*!*/);
    --tw-invert: var(--tw-empty, /*!*/ /*!*/);
    --tw-saturate: var(--tw-empty, /*!*/ /*!*/);
    --tw-sepia: var(--tw-empty, /*!*/ /*!*/);
    --tw-drop-shadow: var(--tw-empty, /*!*/ /*!*/);
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate)
      var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  }

  .transition {
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      -webkit-backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter,
      backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
`;
