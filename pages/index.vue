<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-sky-50 dark:bg-slate-900"
  >
    <div
      class="shadow-lg rounded-lg bg-white py-10 w-10/12 md:w-5/12 h-auto px-5"
    >
      <div class="text-5xl text-center mb-6">Urlify</div>

      <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="url"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white col-span-1 md:col-span-2"
          placeholder="Enter URL here..."
        />
        <button
          @click="shortenUrl"
          :disabled="loading"
          type="button"
          :class="`${
            !loading
              ? 'text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
              : 'text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 focus:outline-none cursor-not-allowed'
          }`"
        >
          <Spinner v-if="loading" />
          {{ !loading ? "Shorten" : "" }}
        </button>
      </div>

      <Alert
        :show="alertMessage.show"
        :type="alertMessage.type"
        :message="alertMessage.message"
      />
      <div>
        <button
          v-if="shortUrl"
          @click="copyShortenUrl"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 w-full flex items-center justify-center"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <span class="ml-3">{{ shortUrl }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const url = ref<string>("");
const shortUrl = ref<string>("");
const loading = ref<boolean>(false);
const alertMessage = ref<{
  show: boolean;
  type: string;
  message: string | undefined;
}>({
  show: false,
  type: "",
  message: "",
});

const resetAlertMessage = () => {
  alertMessage.value = {
    show: false,
    type: "",
    message: "",
  };
};

const validateURL = (url: string): boolean => {
  const regex = new RegExp(
    "^(?:http(s)?:\/\/|ftp:\/\/)[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$"
  );
  return regex.test(url);
};

const copyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy text: ", err);
  }
  document.body.removeChild(textArea);
};

const shortenUrl = async () => {
  resetAlertMessage();

  if (!url.value) {
    alertMessage.value = {
      show: true,
      type: "danger",
      message: "Please enter URL!",
    };
    return;
  }

  if (!validateURL(url.value)) {
    alertMessage.value = {
      show: true,
      type: "danger",
      message: "Invalid URL!",
    };
    return;
  }

  loading.value = true;
  const response = await useFetch(`/api/url`, {
    method: "POST",
    body: JSON.stringify({
      longUrl: url.value,
    }),
  });

  url.value = "";
  shortUrl.value = response.data.value?.shortUrl || "";

  alertMessage.value = {
    show: true,
    type: "success",
    message: response.data.value?.message,
  };

  loading.value = false;
};

const copyShortenUrl = () => {
  const tempButtonText = shortUrl.value;
  copyToClipboard(shortUrl.value);
  shortUrl.value = "Copied!";
  setTimeout(() => {
    shortUrl.value = tempButtonText;
  }, 1000);
};
</script>
