const user = {
  name: 'rick',
  age: 70,
  password: 'rikitikitavibitch',
  password_confirmation: 'rikitikitavibitch',
  email: 'burgertime@bitch.com',
  email_confirmation: 'lickmyballs@bitch.com',
  quality: 'alcoholic',
  catchphrase: 'wubba lubba dub-dub',
  relatives: ['morty', 'summer', 'beth']
};

const rightQualities = [
  'grumpy', 'sociopathic', 'emotionally abusive', 'bad-tempered', 'dismissive', 
  'narcissistic', 'cynical', 'self-centered', 'incredibly intelligent',
  'alcoholic', 'mad scientist',
];

const wrongQualities = [
  'responsive', 'kind', 'gentle',
];

const data = {user, rightQualities, wrongQualities};

module.exports = data;
