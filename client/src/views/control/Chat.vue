<template lang="html">
  <v-container
    class="d-flex flex-column lighten-1"
    style="height:99vh; width:800px;"
    grid-list-xs,sm,md,lg,xl
  >
    <div class="d-flex ma-0">
      <v-btn
        @click.prevent="$router.go(-1)"
        color="warning"
        width="100"
        height="50"
        class="mr-5"
        >Назад
      </v-btn>
      <!-- <v-select
        :items="usersList"
        v-model="value"
        label="Выберете пользователя чтобы начать чат"
      ></v-select> -->
    </div>

    <v-card class="d-flex flex-column elevation-19" style="height:100%">
      <v-card-title
        primary-title
        class="d-flex justify-space-between primary lighten-1"
      >
        <div class="display-1 font-weight-light white--text">
          Чат с поддержкой
        </div>
        <div class="title font-weight-light white--text">
          Статус подключения: {{ connectedStatus }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        class="d-flex flex-column my-auto overflow-y-auto pa-5"
        style="height:70vh"
      >
        <div v-if="messageArray.length === 0">
          <MessageArea
            v-bind:name="''"
            v-bind:textMessage="
              'Сообщений пока нет, задайте интересующий вас вопрос и дождитесь ответа технической поддержки'
            "
            class="ma-1 ma-5"
          />
        </div>
        <MessageArea
          v-else
          v-bind:message="item"
          class="ma-1"
          v-for="(item, index) in messageArray"
          :key="index"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex flex-column lighten-1">
        <InputLine v-bind:sendMessage="sendMessage" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import MessageArea from "./Chat/MessageArea";
import InputLine from "./Chat/InputLine";

const ws = new WebSocket("ws://127.0.0.1:3001");

export default {
  components: {
    MessageArea,
    InputLine
  },
  mounted() {
    ws.onopen = async () => {
      this.setStatus("Подключено");
      let user = await this.userInfo();
      ws.send(
        JSON.stringify({
          messageType: "getMessage",
          userId: user.id
        })
      );
    };
    ws.onclose = () => {
      this.setStatus("Отключен");
    };
    ws.onmessage = res => {
      console.log(res);
    };
  },
  data() {
    return {
      connectedStatus: "OFFLINE",
      usersList: [
        "Филатова Ксения Александровна - нет новых сообщений",
        "Петров Петр Петрович - нет новых сообщений"
      ],
      messageArray: [
        {
          from: "5ec3f98d3d908d38c497e025",
          to: "",
          read: true,
          text: "Здравствуйте, почему не прошла оплата 21.05.2020"
        },
        {
          from: "",
          to: "5ec3f98d3d908d38c497e025",
          read: true,
          text: "Сейчас проверим ожидайте..."
        },
        {
          from: "",
          to: "5ec3f98d3d908d38c497e025",
          read: true,
          text: "Платеж прошел проверьте еще раз личный кабинет"
        },
        {
          from: "5ec3f98d3d908d38c497e025",
          to: "",
          read: true,
          text: "Да все, деньги поступили, спасибо!"
        }
      ]
    };
  },
  methods: {
    setStatus(newStatus) {
      this.connectedStatus = newStatus;
    },
    sendMessage() {},
    userInfo() {
      return new Promise(resolve => {
        let user = this.$store.getters["auth/getUserInfo"];
        resolve(user);
      });
    }
  },
  computed: {}
};
</script>

<style lang="css" scoped></style>
