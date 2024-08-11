import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${s * 10} second`)
      );
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const fetchPro = ;
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};
