// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
// async function trafficLight() {
//    const container = document.createElement('div');
//    container.id = 'traffic-light';
//    const lights = [];
//    for (let i = 0; i < 3; i++) {
//       const light = document.createElement('div');
//       light.className = 'light';
//       const timer = document.createElement('span');
//       timer.className = 'timer';
//       light.appendChild(timer);
//       container.appendChild(light);
//       lights.push(light);
//    }
//    document.body.appendChild(container);
//    let timeLeft = 0;
//    while (true) {
//       lights[0].style.backgroundColor = 'green';
//       lights[1].style.backgroundColor = '';
//       lights[2].style.backgroundColor = '';
//       timeLeft = 10;
//       lights[0].querySelector('.timer').textContent = timeLeft;
//       while (timeLeft > 0) {
//          await delay(1000);
//          timeLeft--;
//          if (timeLeft === 0) {
//             lights[0].querySelector('.timer').textContent = '';
//          } else {
//             lights[0].querySelector('.timer').textContent = timeLeft;
//          }
//       }
//       lights[0].style.backgroundColor = '';
//       lights[1].style.backgroundColor = 'yellow';
//       lights[2].style.backgroundColor = '';
//       timeLeft = 3;
//       lights[1].querySelector('.timer').textContent = timeLeft;
//       while (timeLeft > 0) {
//          await delay(1000);
//          timeLeft--;
//          if (timeLeft === 0) {
//             lights[1].querySelector('.timer').textContent = '';
//          } else {
//             lights[1].querySelector('.timer').textContent = timeLeft;
//          }
//       }
//       lights[0].style.backgroundColor = '';
//       lights[1].style.backgroundColor = '';
//       lights[2].style.backgroundColor = 'red';
//       timeLeft = 10;
//       lights[2].querySelector('.timer').textContent = timeLeft;
//       while (timeLeft > 0) {
//          await delay(1000);
//          timeLeft--;
//          if (timeLeft === 0) {
//             lights[2].querySelector('.timer').textContent = '';
//          } else {
//             lights[2].querySelector('.timer').textContent = timeLeft;
//          }
//       }
//    }
// }
// trafficLight();


// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
// async function trafficLight() {
//    const container = document.createElement('div');
//    container.id = 'traffic-light';
//    const lights = [];
//    const currentState = {
//       green: false,
//       red: false
//    };
//    let isActive = true;
//    for (let i = 0; i < 2; i++) {
//       const light = document.createElement('div');
//       light.className = 'light';
//       const timer = document.createElement('span');
//       timer.className = 'timer';
//       light.appendChild(timer);
//       container.appendChild(light);
//       lights.push(light);
//    }
//    const button = document.createElement('button');
//    button.textContent = 'Za pivom v larek';
//    document.body.appendChild(button);
//    button.addEventListener('click', async () => {
//       if (!isActive) {
//          return;
//       }
//       isActive = false;
//       disableButton();
//       if (!currentState.green && !currentState.red) {
//          currentState.green = true;
//          lights[0].style.backgroundColor = 'green';
//          lights[1].style.backgroundColor = '';
//          let timeLeft = 10;
//          lights[0].querySelector('.timer').textContent = timeLeft;
//          while (timeLeft > 0) {
//             await delay(1000);
//             timeLeft--;
//             if (timeLeft === 0) {
//                lights[0].querySelector('.timer').textContent = '';
//             } else {
//                lights[0].querySelector('.timer').textContent = timeLeft;
//             }
//          }
//       }
//       if (currentState.green) {
//          currentState.green = false;
//          lights[0].style.backgroundColor = '';
//          lights[1].style.backgroundColor = 'red';
//       } else {
//          currentState.green = true;
//          lights[0].style.backgroundColor = 'green';
//          lights[1].style.backgroundColor = '';
//       }
//       enableButton();
//    });
//    function disableButton() {
//       button.disabled = true;
//       setTimeout(() => {
//          button.disabled = false;
//       }, 15000);
//    }
//    function enableButton() {
//       isActive = true;
//       button.textContent = 'Kent koleka dogonyt';
//    }
//    document.body.appendChild(container);
// }
// trafficLight();


// Функція для здійснення GraphQL запиту
async function gql(endpoint, query, variables) {
   try {
      const response = await fetch(endpoint, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify({
            query,
            variables
         })
      });

      const data = await response.json();
      return data;
   } catch (error) {
      console.error('GraphQL request error:', error);
      throw error;
   }
}

// Функція для розкодування JWT токена
function jwtDecode(token) {
   if (!token) {
      return undefined;
   }

   try {
      const parts = token.split('.');
      const encodedPayload = parts[1];
      const decodedPayload = atob(encodedPayload);
      const data = JSON.parse(decodedPayload);
      return data;
   } catch (error) {
      return undefined;
   }
}

// Приклад використання
(async () => {
   const catQuery = `query cats($q: String) {
      CategoryFind(query: $q) {
         _id
         name
      }
   }`;
   const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", catQuery, { q: "[{}]" });
   console.log(cats);
   const loginQuery = `query login($login:String, $password:String) {
      login(login: $login, password: $password)
   }`;
   const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery, { login: "test457", password: "123123" });
   console.log(token);

   const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw";
   console.log(jwtDecode(jwtToken));
   console.log(jwtDecode());
   console.log(jwtDecode("дічь"));
   console.log(jwtDecode("ey.ey.ey"));

   console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором');
})();
