import io from "socket.io-client";

let socket = io(process.env.REACT_APP_URL);
let newOrdersSubscribers = [];
export const connectToIOServer = async () => {
  // socket = io("http://localhost:5001/api");
};
socket.on("connect", () => {
  console.log(`You connected with Id : ${socket.id}`);
  socket.on("updateOrders", () => {
    console.log("New Order added trigger received");
    newOrdersSubscribers.forEach((newOrdersSubscriber) => {
      newOrdersSubscriber();
    });
  });
});

export const sendOrderAddedTrigger = async () => {
  socket.emit("orderAdded");
};

export const subscribeToNewOrders = (onOrderUpdate) => {
  newOrdersSubscribers.push(onOrderUpdate);
};
