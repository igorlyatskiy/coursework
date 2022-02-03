import React from "react";

import { FigureProps } from "./types/FigureProps";
import { FIGURES_COLORS_NAMES } from "../../Constants";

export default function King({ color }: FigureProps) {
  return (
    <svg
      width='37'
      height='78'
      viewBox='0 0 193 409'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='figure figure_king'
    >
      <path
        d='M87.8981 1.49054L87.8887 1.49222C84.8218 2.04529 83.2855 2.64917 82.4791 3.86417C82.0721 4.47739 81.821 5.29141 81.702 6.43771C81.5828 7.58575 81.5995 9.0282 81.6993 10.8732L81.6995 10.8774L81.9995 17.4774L82.0247 18.0325L81.4701 17.9993L76.47 17.6992L76.4654 17.6989C72.8555 17.4482 70.8143 17.7778 69.6379 18.8562C68.465 19.9314 68 21.8915 68 25.4001C68 29.0195 68.6004 31.3588 69.9218 32.8283C71.2337 34.2872 73.3607 35.0017 76.7147 35.1004L76.7185 35.1005C78.0686 35.1505 79.2977 35.2006 80.2027 35.2509C80.6544 35.276 81.0311 35.3014 81.3037 35.3274C81.4387 35.3403 81.5571 35.3541 81.6494 35.3694C81.6944 35.377 81.7447 35.3867 81.7922 35.4C81.8157 35.4066 81.8485 35.4168 81.8841 35.4323C81.8901 35.4349 81.8985 35.4387 81.9087 35.4437C81.9741 35.4722 82.0328 35.5139 82.0813 35.5658C82.1632 35.6535 82.1954 35.7477 82.2091 35.799C82.2358 35.8993 82.2317 35.9937 82.2283 36.0429C82.2205 36.1571 82.1931 36.2946 82.1597 36.4339C82.0905 36.7223 81.9695 37.1228 81.8118 37.5958C81.4953 38.5453 81.0168 39.8295 80.4643 41.1857C79.9215 42.5677 79.4275 44.0746 79.0698 45.3821C78.7064 46.7105 78.5 47.7755 78.5 48.3001C78.5 49.1339 78.1474 50.0304 77.591 50.865C77.0313 51.7046 76.2404 52.5198 75.2997 53.2005C73.7971 54.3652 72.9443 55.5282 72.6714 56.5761C72.408 57.5873 72.6659 58.5589 73.5536 59.4466C74.008 59.901 74.4187 60.4525 74.3312 61.0857C74.2431 61.7238 73.6886 62.1801 72.9689 62.5559C71.4879 63.3291 68.5423 64.142 63.6154 65.2867C55.5285 67.2336 49.9833 69.3159 46.4659 71.8318C42.9851 74.3215 41.5 77.2257 41.5 80.9001C41.5 85.4643 43.2266 93.0739 46.1249 101.881C49.0174 110.671 53.0582 120.599 57.6472 129.777L57.6482 129.779C59.8506 134.233 61.4332 137.724 62.3912 140.194C62.8692 141.427 63.198 142.422 63.3685 143.163C63.4534 143.532 63.5039 143.858 63.5078 144.13C63.5112 144.374 63.4805 144.689 63.2824 144.922C63.1067 145.132 62.8099 145.359 62.472 145.582C62.12 145.814 61.68 146.069 61.1826 146.33C60.1897 146.852 58.9466 147.41 57.6772 147.868C55.6661 148.672 54.6618 149.159 53.9425 150C53.2109 150.856 52.7356 152.122 51.9796 154.641C51.33 156.89 50.786 158.366 49.9802 159.481C49.1611 160.614 48.1024 161.333 46.5293 162.144L46.5236 162.147C45.5673 162.626 44.6047 163.299 43.8236 164.008C43.0345 164.724 42.4802 165.432 42.2699 165.971C41.8139 167.312 42.3732 168.864 43.7975 170.241C45.2148 171.611 47.4159 172.72 49.9746 173.106C51.6678 173.355 52.8304 173.64 53.6267 174.205C54.4636 174.798 54.8267 175.645 55.086 176.782C55.9376 180.084 58.6936 182.984 63.2077 185.045L63.215 185.049C64.2887 185.56 65.3386 186.174 66.1763 186.767C66.595 187.063 66.9674 187.359 67.2655 187.639C67.5552 187.91 67.8071 188.196 67.9472 188.477L67.9593 188.501L67.9687 188.526C68.3195 189.471 68.5825 191.119 68.7805 193.26C68.9801 195.419 69.1177 198.13 69.1983 201.234C69.3595 207.443 69.2937 215.247 69.0373 223.391C68.5247 239.666 67.2493 257.351 65.4909 266.395C61.0778 289.263 52.5474 308.442 39.7878 324.116L39.7852 324.119C38.6038 325.546 37.4697 327.198 36.5955 328.713C35.7109 330.245 35.1272 331.578 34.9932 332.382L34.9915 332.392L34.9894 332.403C34.5312 334.592 33.9822 336.11 32.6919 337.613C31.4268 339.087 29.4679 340.522 26.2743 342.618L26.2726 342.619C19.1893 347.226 13.2689 353.643 9.47036 360.213C5.66271 366.799 4.03257 373.455 5.3829 378.57C5.67374 379.636 6.11155 380.756 6.57337 381.691C7.04415 382.645 7.50603 383.339 7.82516 383.62C8.4426 384.135 8.92365 384.656 9.17591 385.226C9.44238 385.827 9.4359 386.443 9.15782 387.076C8.89169 387.682 8.38239 388.294 7.67046 388.952C6.95314 389.614 5.99517 390.354 4.78901 391.208L4.78903 391.208L4.78461 391.211C2.82916 392.565 1.78073 393.442 1.20268 394.304C0.648346 395.13 0.5 395.983 0.5 397.4C0.5 398.941 0.697552 400.108 1.22898 401.048C1.7545 401.977 2.64284 402.747 4.15307 403.418C5.67226 404.093 7.78741 404.654 10.719 405.177C13.6458 405.699 17.3571 406.178 22.0546 406.703C29.8721 407.549 56.6381 407.975 84.5873 407.963C112.528 407.95 141.585 407.5 153.964 406.601L153.967 406.601C164.511 405.902 172.769 405.078 178.824 404.143C181.851 403.676 184.319 403.183 186.242 402.666C188.175 402.146 189.519 401.612 190.325 401.082L190.332 401.078L190.339 401.073C191.181 400.559 191.7 400.026 192.022 399.338C192.352 398.635 192.5 397.721 192.5 396.4C192.5 394.689 192.353 393.72 191.511 392.586C190.624 391.392 188.964 390.011 185.797 387.598L185.792 387.594L183.492 385.794L183.139 385.518L183.375 385.137L185.47 381.744C185.471 381.743 185.472 381.742 185.473 381.741C187.874 377.703 188.193 371.169 186.03 365.17L186.029 365.167C184.557 360.996 181.373 356.05 177.595 351.638C173.817 347.226 169.491 343.403 165.769 341.444C163.666 340.366 161.622 338.781 160.099 337.168C159.337 336.361 158.695 335.537 158.241 334.754C157.793 333.981 157.5 333.203 157.5 332.5C157.5 331.547 157.189 330.548 155.856 328.498C154.52 326.445 152.21 323.413 148.306 318.408C135.335 301.917 125.31 274.822 122.503 248.553L122.503 248.552C121.85 242.28 121.225 228.437 120.875 215.739C120.7 209.386 120.594 203.313 120.588 198.607C120.584 196.255 120.606 194.24 120.657 192.702C120.683 191.934 120.716 191.28 120.757 190.76C120.797 190.256 120.847 189.849 120.914 189.584C121.37 187.543 122.866 186.351 125.342 185.526C127.188 184.91 129.246 183.42 130.847 181.709C131.645 180.857 132.315 179.964 132.783 179.12C133.256 178.268 133.5 177.505 133.5 176.9C133.5 176.366 133.535 175.865 133.723 175.427C133.922 174.962 134.268 174.62 134.776 174.347C135.267 174.084 135.929 173.875 136.797 173.671C137.67 173.466 138.789 173.258 140.214 173.008L140.217 173.007C143.919 172.382 145.835 170.283 146.078 168.132C146.321 165.982 144.922 163.506 141.41 162.063L141.409 162.062C139.925 161.448 138.906 160.831 138.116 159.805C137.342 158.8 136.821 157.444 136.221 155.444L136.218 155.435C135.616 153.276 135.19 152.108 134.387 151.192C133.577 150.269 132.346 149.557 129.988 148.453L129.976 148.447C128.568 147.743 127.212 147.015 126.156 146.424C125.117 145.842 124.333 145.375 124.1 145.2L124.043 145.157L124 145.1C123.882 144.943 123.872 144.764 123.87 144.683C123.868 144.58 123.881 144.469 123.899 144.362C123.936 144.147 124.008 143.876 124.104 143.566C124.297 142.942 124.609 142.099 125.011 141.101C125.816 139.101 126.995 136.442 128.348 133.586L128.351 133.579C138.139 113.705 143.208 97.8711 144.201 84.7624L144.201 84.7618L144.783 77.1995L141.257 73.8636C140.407 73.0609 139.005 72.1486 137.196 71.1991C135.395 70.2538 133.219 69.2864 130.844 68.3664C126.094 66.5258 120.574 64.8853 115.71 63.9919L115.709 63.9917C115.512 63.9551 115.323 63.9204 115.143 63.8872C114.35 63.7415 113.712 63.6241 113.23 63.5C112.932 63.4231 112.665 63.3372 112.444 63.2275C112.221 63.1173 112.013 62.9684 111.87 62.7499C111.57 62.2943 111.685 61.7599 111.855 61.28C112.005 60.8574 112.257 60.3241 112.567 59.6707C112.624 59.5494 112.683 59.4239 112.744 59.2943C113.24 58.1532 113.359 57.59 113.152 56.9877C113.041 56.6646 112.824 56.2972 112.443 55.8172C112.063 55.3385 111.541 54.7731 110.843 54.0504C109.921 53.1273 109.099 52.1014 108.505 51.1845C108.208 50.7257 107.963 50.2863 107.789 49.8943C107.622 49.5158 107.5 49.1317 107.5 48.8001C107.5 48.636 107.456 48.3334 107.355 47.8988C107.257 47.4755 107.114 46.96 106.935 46.3865C106.578 45.2398 106.083 43.8802 105.54 42.595C104.984 41.282 104.502 39.9643 104.183 38.8928C104.024 38.3581 103.903 37.8749 103.834 37.4795C103.8 37.282 103.777 37.0971 103.771 36.9333C103.765 36.7788 103.772 36.6018 103.826 36.442C103.888 36.2543 104.01 36.1106 104.131 36.0046C104.254 35.8968 104.401 35.8057 104.556 35.7274C104.864 35.5712 105.26 35.4384 105.704 35.3276C106.595 35.1048 107.755 34.9516 108.979 34.9006L108.99 34.9001H109C110.679 34.9001 111.798 34.7502 112.704 34.365C113.6 33.9843 114.339 33.3519 115.213 32.2835L115.219 32.276L115.226 32.2686C118.161 28.955 118.262 23.4246 115.506 19.9086L115.502 19.9027C114.561 18.6643 113.965 18.1009 113.11 17.8262C112.205 17.5359 110.957 17.5475 108.633 17.6991L108.629 17.6993L103.529 17.9993L102.972 18.0321L103.001 17.4743L103.301 11.6743L103.301 11.6708C103.5 8.28384 103.213 6.12039 102.336 4.68588C101.481 3.28632 99.9975 2.47977 97.5038 1.99081L97.4946 1.98901L97.4855 1.98685C95.7926 1.58853 93.7123 1.19305 92.938 1.09631L92.908 1.09256L92.8787 1.08524C92.7381 1.05008 92.4865 1.02505 92.127 1.022C91.7769 1.01904 91.3546 1.03687 90.8894 1.07361C89.9588 1.14706 88.8784 1.29437 87.8981 1.49054Z'
        fill={color === FIGURES_COLORS_NAMES.white ? "#F0F7F4" : "#40B3A2"}
        stroke='#E27D5F'
        strokeWidth='4'
      />
    </svg>
  );
}
