// import { defineConfig } from "cypress";
// import axios from "axios";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       on('task', {
//         async 'db:erase'() {
//           const { data } = await axios.delete(`http://localhost:3000/users`);
//           return data;
//         },

//         async 'db:create'(users) {
//           const { data } = await axios.post(`http://localhost:3000/users`, users);
//           return data;
//         },
//       })
//     },
//   },
// });

import { defineConfig } from "cypress";
import axios from "axios";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:erase'() {
          try {
            const { data } = await axios.delete(`http://localhost:3000/users`);
            return data;
          } catch (error) {
            console.error('Error erasing database:', error);
            throw new Error('Failed to erase database');
          }
        },

        async 'db:create'(user) {
          try {
            const { data } = await axios.post(`http://localhost:3000/users`, user);
            return data;
          } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
          }
        },

        async 'db:find'(query) {
          try {
            const { data } = await axios.get(`http://localhost:3000/users`, { params: query });
            return data.length > 0 ? data[0] : null;
          } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Failed to find user');
          }
        }
      });
    },
  },
});

