import { css } from 'lit-element';

export default css`
  .root {
    display: flex;
    padding: 16px;
    flex-basis: calc(100% / 3);
    align-items: center;
    justify-content: flex-start;
  }

  .root::before {
    content: '';
    width: 38px;
    height: 38px;
    margin-right: 10px;
  }

  .root.BTCUSDT::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cdefs/%3E%3Cpath d='M256.198 0C114.804-.119.119 114.408 0 255.802S114.408 511.881 255.802 512c141.375-.119 255.98-114.625 256.198-256C512 114.685 397.513.119 256.198 0zm-.396 469.4c-117.855 0-213.399-95.545-213.399-213.4S137.947 42.601 255.802 42.601c117.815.119 213.28 95.584 213.399 213.399 0 117.855-95.544 213.4-213.399 213.4z'/%3E%3Cpath d='M324.954 243.517c17.12-9.65 26.373-28.968 23.183-48.347-3.963-29.919-39.628-41.214-67.765-43.591v-44.978h-27.74v44.582h-18.625v-44.582h-27.74v44.582H150.39v28.731h20.805c9.313 0 13.87 2.774 13.87 10.303V313.66c0 10.303-5.152 13.474-10.7 13.474h-21.201v29.325h53.895v45.573h27.938v-45.573h18.625v45.573h27.146v-45.573h5.944c57.065 0 76.087-27.938 76.087-65.981-.456-22.431-16.01-41.73-37.845-46.961zm-90.948-61.82h19.814c13.87 0 41.214 2.378 41.214 24.966.951 14.742-9.729 27.661-24.372 29.523h-36.656v-54.489zm30.712 142.662v-.198h-30.712v-59.443h35.666c8.322 0 39.628 2.774 39.628 24.966s-14.86 34.675-44.582 34.675z'/%3E%3C/svg%3E");
  }
  .root.ETHUSDT::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448.941 448.941'%3E%3Cdefs/%3E%3Cpath d='M56.118 238.5l168.353 210.441L392.824 238.5l-168.353 70.147zm90.376 68.054l67.186 27.994 10.791 4.495v64.982l-77.977-97.471z'/%3E%3Cpath d='M392.824 224.471L224.471 0 56.118 224.471l168.353 56.118zm-168.353-28.059l-122.439 13.605L224.471 46.763z'/%3E%3C/svg%3E");
  }

  .root.ETHBTC::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cdefs/%3E%3Cpath d='M20 18c-.125 0-.251-.023-.372-.071L15 16.077l-4.628 1.852a1 1 0 01-1.266-1.376l5-10c.339-.678 1.45-.678 1.789 0l5 10A.997.997 0 0120 18zm-5-4a1 1 0 01.372.071l2.558 1.023L15 9.236l-2.929 5.858 2.558-1.023A.99.99 0 0115 14z'/%3E%3Cpath d='M15 24c-.297 0-.578-.132-.768-.359l-5-6a.999.999 0 01.397-1.57l5-2a.994.994 0 01.743 0l5 2a1 1 0 01.397 1.57l-5 6A1.005 1.005 0 0115 24zm-3.351-6.583L15 21.438l3.351-4.021L15 16.077zM45 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15zm0-28c-7.168 0-13 5.832-13 13s5.832 13 13 13 13-5.832 13-13-5.832-13-13-13z'/%3E%3Cpath d='M47 46h-6a1 1 0 01-1-1v-6a1 1 0 011-1h6c2.206 0 4 1.794 4 4s-1.794 4-4 4zm-5-2h5c1.103 0 2-.897 2-2s-.897-2-2-2h-5z'/%3E%3Cpath d='M47 52h-6a1 1 0 01-1-1v-6a1 1 0 011-1h6c2.206 0 4 1.794 4 4s-1.794 4-4 4zm-5-2h5c1.103 0 2-.897 2-2s-.897-2-2-2h-5zM43 40a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1zM47 40a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1z'/%3E%3Cpath d='M43 55a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1zM47 55a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1zM9 55c-.28 0-.554-.118-.748-.336l-8-9a1 1 0 010-1.328l8-9A1 1 0 0110 36v4h21.587a1 1 0 01.959 1.285C32.184 42.501 32 43.751 32 45s.184 2.499.546 3.715A1 1 0 0131.587 50H10v4a1 1 0 01-1 1zM2.338 45L8 51.37V49a1 1 0 011-1h21.306c-.203-.99-.306-1.995-.306-3s.103-2.01.306-3H9a1 1 0 01-1-1v-2.37zM15 30C6.729 30 0 23.271 0 15S6.729 0 15 0s15 6.729 15 15-6.729 15-15 15zm0-28C7.832 2 2 7.832 2 15s5.832 13 13 13 13-5.832 13-13S22.168 2 15 2z'/%3E%3Cpath d='M51 25a1 1 0 01-1-1v-4H28.413a1 1 0 01-.959-1.285C27.816 17.497 28 16.248 28 15s-.184-2.497-.546-3.715A1 1 0 0128.413 10H50V6a1 1 0 011.748-.664l8 9a1 1 0 010 1.328l-8 9A1.001 1.001 0 0151 25zm-21.306-7H51a1 1 0 011 1v2.37L57.662 15 52 8.63V11a1 1 0 01-1 1H29.694c.203.991.306 1.996.306 3s-.103 2.009-.306 3zM41 40h-2a1 1 0 110-2h2a1 1 0 110 2zM41 52h-2a1 1 0 110-2h2a1 1 0 110 2z'/%3E%3C/svg%3E");
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .label {
    font-size: 16px;
    font-weight: bold;
    color: rgb(38, 49, 71);
    margin-right: 5px;
  }

  .lastPrice {
    font-size: 16px;
    white-space: nowrap;
  }

  .changePrice {
    font-size: 12px;
    white-space: nowrap;
  }

  .changePrice::before {
    margin-right: 5px;
  }

  .changePrice.success::before {
    content: '↑';
  }
  .changePrice.danger::before {
    content: '↓';
  }

  .success {
    color: rgb(0, 192, 135);
  }
  .danger {
    color: rgb(234, 0, 112);
  }
`;
