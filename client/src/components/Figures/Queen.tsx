import React from "react";

import { FigureProps } from "./types/FigureProps";
import { FIGURES_COLORS_NAMES } from "../../Constants";

export default function Queen({ color }: FigureProps) {
  return (
    <svg
      width='37'
      height='78'
      viewBox='0 0 37 78'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='figure figure_queen'
    >
      <path
        d='M17.5089 0.049942C15.5929 0.560455 14.844 2.73567 15.9673 4.44478C16.65 5.4214 16.5399 5.64336 14.8881 6.46462C13.3905 7.21929 12.003 8.61765 11.2321 10.1048L10.6375 11.3034L10.2851 10.6153C9.93274 9.94941 9.88869 9.94941 8.56726 10.016C7.81845 10.0604 7.13571 10.1492 7.06964 10.2158C7.00357 10.2824 7.24583 11.1924 7.57619 12.2134C7.90655 13.2566 8.4131 15.0767 8.6994 16.2753C9.29405 18.7835 10.153 21.0253 11.5625 23.8664C12.1131 24.954 12.5536 25.9306 12.5536 26.0416C12.5536 26.1304 12.0911 26.4189 11.4964 26.6631C10.5494 27.0626 10.4173 27.218 10.131 28.1946C9.86667 29.0381 9.66845 29.3266 9.27202 29.4154C8.56726 29.5708 8.25893 30.1035 8.45714 30.8138C8.56726 31.2577 8.80952 31.4575 9.6244 31.6794C10.3732 31.9014 10.7036 32.1233 10.7476 32.4119C10.8798 33.0334 11.4304 33.6105 12.3333 34.0544C13.0381 34.3873 13.1262 34.5205 13.3024 35.7413C13.6107 37.739 13.1042 46.9725 12.5536 49.6805C11.6726 53.9643 10.0869 57.5823 7.92857 60.3124C7.3119 61.0671 6.71726 62.0659 6.60714 62.532C6.40893 63.1979 6.12262 63.5308 5.21964 64.1079C1.87202 66.261 0.0440476 70.1009 1.34345 72.2317C1.58571 72.6312 1.7619 72.9864 1.71786 73.0086C1.67381 73.0308 1.27738 73.3193 0.836905 73.6523C0.154167 74.1628 0 74.4069 0 75.0062C0 75.428 0.17619 75.8941 0.396429 76.0938C2.775 78.2691 31.428 78.7352 36.075 76.6931C36.9339 76.2936 37 76.227 37 75.3836C37 74.4957 36.8458 74.3182 35.2601 73.2083C35.2161 73.164 35.3482 72.942 35.5905 72.6756C36.2071 71.9654 36.1631 69.8123 35.4804 68.414C34.8196 67.06 33.0357 65.0624 31.8024 64.3521C30.7232 63.7084 30.1726 63.0647 30.1726 62.3766C30.1726 62.1325 29.578 61.2002 28.8732 60.3124C25.8119 56.4725 24.072 51.3896 23.5655 44.8639C23.3012 41.5567 23.2792 34.9644 23.5214 34.6093C23.6095 34.4761 24.094 34.1432 24.6006 33.899C25.2613 33.5439 25.5696 33.2109 25.7458 32.6782C25.9661 32.0345 26.1423 31.8792 26.9131 31.7238C28.0363 31.4796 28.4988 30.8582 28.1244 30.0813C27.9702 29.7927 27.6179 29.482 27.3095 29.4154C26.8911 29.3266 26.6708 29.0381 26.4065 28.1946C26.0982 27.218 25.9661 27.0626 25.0411 26.6853C24.4685 26.4411 24.006 26.1526 24.006 26.0638C24.006 25.9528 24.3583 25.1759 24.7768 24.3325C26.1863 21.4914 27.1113 18.961 27.9702 15.565C28.4548 13.7228 28.9613 11.7917 29.1155 11.2812C29.2476 10.7707 29.3357 10.2824 29.2696 10.238C29.0274 9.9938 27.5738 9.86063 27.4417 10.0826C27.3756 10.1936 27.1113 10.238 26.8911 10.1714C26.6048 10.1048 26.3405 10.238 26.0982 10.6375L25.7018 11.2146L25.1952 10.127C24.5345 8.68423 23.147 7.28588 21.4292 6.37584C20.6804 5.97631 19.9976 5.55458 19.9315 5.4436C19.8655 5.33262 20.0637 4.88869 20.372 4.42258C21.5833 2.64689 20.6804 0.427277 18.6101 0.049942C18.2357 -0.0166473 17.7512 -0.0166473 17.5089 0.049942Z'
        fill={
          color === FIGURES_COLORS_NAMES.white
            ? "#F0F7F4"
            : "#40B3A2"
        }
        stroke='#E27D5F'
      />
    </svg>
  );
}
