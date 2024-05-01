    const toggle = document.getElementById('toggle');
    const specifications = document.getElementById('specifications');
    const guide = document.getElementById('guide');

    toggle.addEventListener('change', function () {
        if (this.checked) {
            specifications.style.display = 'none';
            guide.style.display = 'block';
        } else {
            guide.style.display = 'none';
            specifications.style.display = 'block';
        }
    });


        // JavaScript code to handle search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const searchResults = document.getElementById('search-results');const guideText = `
1. **Setting up the Console:**
   - Connect the console to your TV via an HDMI cable.
   - Connect the power supply to the console and plug it in.
   - Turn on the console by pressing the Xbox button on the controller or the front of the console.
   - Follow the on-screen instructions to set up your console, including language, time zone, and internet connection.

2. **Xbox Live Account:**
   - You will need a Microsoft account to access online features and multiplayer gaming.
   - You can create an account or sign in with an existing Microsoft account.

3. **Using the Controller:**
   - The controller is your primary input device. It has buttons for gaming, thumbsticks, and triggers.
   - The Xbox button in the center allows you to access the Xbox guide and navigate the console's menus.

4. **Installing Games:**
   - You can install games from physical discs or download them from the Xbox Store.
   - Games can be installed on the console's internal NVMe SSD or on compatible external storage devices.

5. **Quick Resume:**
   - Xbox Series X features a Quick Resume function that allows you to switch between multiple games and apps seamlessly.

6. **Accessing Apps and Entertainment:**
   - The Xbox Series X can be used for more than just gaming. You can access apps like Netflix, Disney+, and more for streaming entertainment.
   - Use voice commands with the built-in voice assistant or your own voice.

7. **Multiplayer and Online Play:**
   - Subscribe to Xbox Live Gold or Xbox Game Pass Ultimate for access to online multiplayer features.
   - You can join parties, chat with friends, and play games online.

8. **Xbox Settings:**
   - Access system settings to customize your console, adjust display and audio settings, and manage storage.

9. **Gaming Accessories:**
   - The Xbox Series X supports various accessories like headsets, external hard drives, and custom controllers.

10. **Optimizing Games:**
    - The Xbox Series X can take advantage of "Smart Delivery" where certain games automatically upgrade to the best version available for your console.

11. **Troubleshooting:**
    - If you encounter issues, refer to the Xbox Series X's troubleshooting guide or visit the Xbox support website for help.

The user interface and features of the Xbox Series X may change over time with software updates, so it's a good idea to explore the on-screen menus and check the Xbox website for the most up-to-date information and guides. The Xbox Series X offers a highly immersive gaming and entertainment experience with its powerful hardware and wide range of features.
`;

      // Split the guide text into lines
      const guideLines = guideText.split('\n');

      // Create a dictionary from the guide lines
      const guideData = [];
      let currentQuery = '';
      let currentDescription = '';
      let isQuery = false;

      guideLines.forEach((line) => {
          const trimmedLine = line.trim();
          if (/^\d+\.\s*\*\*(.+?)\*\*:*$/.test(trimmedLine)) {
              if (isQuery) {
                  guideData.push({ query: currentQuery, description: currentDescription });
              }
              currentQuery = trimmedLine.match(/^\d+\.\s*\*\*(.+?)\*\*:*/)[1];
              currentDescription = '';
              isQuery = true;
          } else if (trimmedLine.startsWith('- ')) {
              if (currentDescription) {
                  currentDescription += '\n';
              }
              currentDescription += trimmedLine.substring(2).trim();
          }
      });

      // Add the last query
      if (isQuery) {
          guideData.push({ query: currentQuery, description: currentDescription });
      }

      console.log(guideData);


        // Event listener for search input
        searchInput.addEventListener('input', function () {
            const userInput = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';

            if (!userInput) {
                return;
            }

            const matchingQueries = guideData.filter(item => item.query.toLowerCase().includes(userInput));

            matchingQueries.forEach(item => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion';
                suggestion.textContent = item.query;
                suggestion.addEventListener('click', function () {
                    // When a suggestion is clicked, display its description
                    const description = document.createElement('div');
                    description.className = 'description';
                    const descriptionLines = item.description.split('\n');
                    descriptionLines.forEach(line => {
                        const paragraph = document.createElement('p');
                        paragraph.textContent = " - " + line;
                        description.appendChild(paragraph);
                    });
                                searchResults.innerHTML = '';
                                searchResults.appendChild(description);
                            });
                            searchResults.appendChild(suggestion);
                        });
                    });
        
        
        // Event listener for search button
        searchButton.addEventListener('click', function () {
            const userInput = searchInput.value.toLowerCase();
            const selectedQuery = guideData.find(item => item.query.toLowerCase() === userInput);

            if (selectedQuery) {
                const description = document.createElement('div');
                description.className = 'description';
                description.textContent = selectedQuery.description;
                searchResults.innerHTML = '';
                searchResults.appendChild(description);
            }
        });

