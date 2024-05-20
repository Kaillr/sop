document.addEventListener("DOMContentLoaded", function() {
    // Show notice after a short delay
    setTimeout(() => document.querySelector('.notice').classList.add('active'), 100);
    
    // Fetch member data from your backend server
    fetch('https://shitosuplayers.xyz/data/members')
        .then(response => response.json())
        .then(data => {
            const memberList = document.getElementById('memberList');

            // Loop through each member category
            for (const category in data.members) {
                const members = data.members[category];

                // Create a section for each category
                const categorySection = document.createElement('div');
                categorySection.classList.add('member-list-container');

                const categoryHeader = document.createElement('div');
                categoryHeader.classList.add('member-list-header');
                categoryHeader.innerHTML = `<div class="divLine"></div><p>${category}</p>`;
                categorySection.appendChild(categoryHeader);

                const membersContainer = document.createElement('div');
                membersContainer.classList.add('members');

                // Loop through each member in the category
                members.forEach(member => {
                    const memberInfo = document.createElement('div');
                    memberInfo.classList.add('member-info');

                    // Fetch additional user data from osu! API
                    fetch(`https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${member.osu_id}`)
                        .then(response => response.json())
                        .then(userData => {
                            // Create HTML for member info with fetched user data
                            memberInfo.innerHTML = `
                                <a href="https://osu.ppy.sh/users/${member.osu_id}" class="profileLink"></a>
                                <img src="https://a.ppy.sh/${member.osu_id}?.jpeg" class="pfp">
                                <div class="user-info">
                                    <div class="icon-container">
                                        <img src="/media/images/flags/${userData.country}.png" class="flag">
                                        <img src="/media/images/icons/osu/osu-standard-white.png" class="gamemode-icon">
                                    </div>
                                    <div class="name-rank">
                                        <h1>${userData.username}</h1>
                                        <p>#${userData.pp_rank}</p>
                                    </div>
                                </div>
                                <div class="discord">
                                    <img src="/media/images/icons/socials/discord-mark-white.svg" class="discord-icon">
                                    <p>${member.discord}</p>
                                </div>
                                <div class="status-${category.toLowerCase().replace(' ', '-')}">${category}</div>
                                <div class="outline-${category.toLowerCase().replace(' ', '-')}"></div>
                                <div class="shadow"></div>
                            `;

                            // Append member info to container
                            membersContainer.appendChild(memberInfo);
                        })
                        .catch(error => console.error('Error fetching user data:', error));
                });

                // Append members container to category section
                categorySection.appendChild(membersContainer);

                // Append category section to member list
                memberList.appendChild(categorySection);
            }
        })
        .catch(error => console.error('Error fetching member data:', error));
});
