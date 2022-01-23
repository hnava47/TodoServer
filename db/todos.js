const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

const todos = [
    {
        id: uuid(),
        text: 'Call the DMV'
    },
    {
        id: uuid(),
        text: 'Walk the dog'
    },
    {
        id: uuid(),
        text: 'Get snow tires'
    }
];

module.exports = {
    todos,
    uuid
}
