const Discord = require('discord.js')
const fetch = require("node-fetch");
const client = new Discord.Client()
var message = 0
client.login("Nzk2NDQxMTc0NDk5Nzg2Nzgy.X_X9pQ.FiqSnjx2fB_ebnlG-Kmi51yUr2c")
client.on('ready', () => {
    var generalChannel = client.channels.cache.get("796460268602916926") // Replace with known channel ID
    generalChannel.send("BigBhamber")
})
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    message = receivedMessage
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.startsWith("!"))
    {
        getCommands(receivedMessage)
    }
});


    function getCommands(receivedMessage) {

        let full = receivedMessage.content.substr(1) // removes exclamation mark
        var cmd = ""
        var ranCheck = full.includes("random")
        var helpCheck = full.includes("help")
        var fcCheck = full.includes("fc")
        var mmCheck = full.includes("bigbhamberbigbeanburrito")
        if ((ranCheck === true)||(helpCheck===true)||(fcCheck===true)||(mmCheck===true))
        {
             cmd = full
        }
        else
        {
            cmd =full.substr(0,full.indexOf(' '));
            var val = full.substr(full.indexOf(' ')+1);
        }
        if (cmd ==='help')
        {
            helpFunc()
        }
        else if(cmd ==='score')
        {
            AnimeScore(val)
        }
        else if (cmd ==='watchtime')
        {
            WatchTime(val)
        }
        else if (cmd ==='random')
        {
            randomAnime()
        }
        else if(cmd ==='studio')
        {
            findStudios(val)
        }
        else if (cmd ==='episode')
        {
            numEps(val)
        }
        else if (cmd ==='fc')
        {
            message.channel.send("https://www.twitch.tv/itsnotphong")
        }
        else if(cmd ==='bigbhamberbigbeanburrito')
        {

            message.channel.send("https://www.youtube.com/watch?v=mRRW7l3tzKI&ab_channel=Onkarian")
            message.channel.send("https://media1.tenor.com/images/87f01c68dd8bd4c998d8b2675ae3a3e1/tenor.gif")
        }
        else{
            message.channel.send("Invalid command, please use !help, for all commands")
        }

    }

    function helpFunc()
    {
        let helpOut = `\`\`\`
Commands help table
+------------+------------------------------+
|  Command   |            Action            |
+------------+------------------------------+
| !help      | Lists all commands           |
+------------+------------------------------+
| !score     | review score for given anime |
+------------+------------------------------+
| !studio    | studio for given anime       |
+------------+------------------------------+
| !random    | generates a random anime     |
+------------+------------------------------+
| !episode   | episode count of given anime |
+------------+------------------------------+
| !watchtime | provides user watch time     |
+------------+------------------------------+
        \`\`\``;
        message.channel.send(helpOut)
    }
    function numEps(val)
    {
        var query = `
        query($search:String)
        {
	           Media(search:$search,type:ANIME)
               {
                   title{
                       romaji
                   }
                   coverImage{
                       large
                   }
                   nextAiringEpisode{
                       episode
                   }
                   episodes
                   externalLinks {
                       url

                   }
               }
           }
        `;
        var name = {
            search: val
        };

        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: name
                })
            };
            fetch(url, options).then(handleResponse)
                               .then(handleDataEpisodes)
                               .catch(handleError);
    }
    function findStudios(val)
    {
        var query =`
                query($search:String) {
                Media(search:$search , type: ANIME) {
                    coverImage {
                        large
                    }
                    title{
                        romaji
                    }
                studios {

                        nodes {
                            name
                        }
                }
            }

            }
        `;
        var name = {
            search: val
        };
        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: name
                })
            };
            fetch(url, options).then(handleResponse)
                               .then(handleDataStudio)
                               .catch(handleError);



    }
    function randomAnime()
    {
        var idCode = Math.floor((Math.random() * 10870) + 1);// random number between this for anime to pick.
        var query =`
                query($id:Int) {
                Media(id:$id,type:ANIME) {
		                  title
                          {
                              romaji
                          }
                siteUrl
            }
        }

        `;

        var animeid = {
            id: idCode
        };


        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: animeid
                })
            };
            fetch(url, options).then(handleResponse)
                               .then(handleDataRandom)
                               .catch(handleErrorRandom);

    }
    function WatchTime(val)
    {
        var query = `
        query($name:String) {
            User(name:$name) {
                avatar{
                    large
                }
                id
                name
                siteUrl
               	statistics{
                   anime
                 	{
               			count
             			episodesWatched
                        minutesWatched
                 	}
                 }

            }
        }
        `;
        var userName = {
            name: val
        };
        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: userName
                })
            };
            fetch(url, options).then(handleResponse)
                               .then(handleDataWatch)
                               .catch(handleError);




    }
    function AnimeScore(val)
    {
        var query = `
        query($search:String) {
            Media (search: $search, type: ANIME) {
                coverImage {
                    large
                }

                averageScore
                title{
                    romaji
                }
            }
        }
        `;
        var givenName = {
            search: val
        };
// post request for info.
        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: givenName
                })
            };

            fetch(url, options).then(handleResponse)
                               .then(handleDataScore)
                               .catch(handleError);

    }
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    function handleDataStudio(data) {
         // Replace with known channel ID
         message.channel.send(data.data.Media.coverImage.large)
        message.channel.send(data.data.Media.title.romaji+"'s main producton studio:\n"+data.data.Media.studios.nodes[0].name)
        console.log(data);
    }
    function handleDataScore(data) {
         // Replace with known channel ID
        JSON.parse(JSON.stringify(data))
        message.channel.send(data.data.Media.coverImage.large)
        if (data.data.Media.averageScore === null)
        {
            message.channel.send(data.data.Media.title.romaji+"'s Average Score: Unavailable")
        }
        else {
            message.channel.send(data.data.Media.title.romaji+"'s Average Score: "+data.data.Media.averageScore)
        }

        console.log(data);
    }
    function handleDataEpisodes(data) {
         // Replace with known channel ID
        JSON.parse(JSON.stringify(data))
        if (data.data.Media.episodes != null)
        {
            message.channel.send(data.data.Media.title.romaji+"'s Number of Episodes: "+data.data.Media.episodes)

        }
        else if(data.data.Media.nextAiringEpisode.episode != null)
        {
            message.channel.send(data.data.Media.title.romaji+"'s Latest episode: "+data.data.Media.nextAiringEpisode.episode)
        }
        else {
            message.channel.send(data.data.Media.title.romaji+"'s Number of Episodes: Currently ongoing")
        }
        message.channel.send(data.data.Media.externalLinks[1].url)
        console.log(data);
    }
    function handleDataWatch(data) {
         // Replace with known channel ID
        JSON.parse(JSON.stringify(data))
        var hours = Math.floor(data.data.User.statistics.anime.minutesWatched/60)
        var minutesRemain = data.data.User.statistics.anime.minutesWatched%60
        var days = Math.floor(hours/24)
        var hoursRemain = hours%24

        message.channel.send(data.data.User.name+"'s Watch Statistics: \n"+data.data.User.statistics.anime.episodesWatched + " Episodes watched\nMinutes Watched: "+data.data.User.statistics.anime.minutesWatched)
        message.channel.send("\n"+hours+" hours and "+minutesRemain+" minutes\n");
        message.channel.send(days+" days and "+hoursRemain+" hours\n");
        message.channel.send(data.data.User.siteUrl)
        console.log(data);
    }
    function handleDataRandom(data) {
         // Replace with known channel ID
         if (data.data.Media.title.romaji === undefined)
         {
             randomAnime()
         }
         else
         {
             JSON.parse(JSON.stringify(data))
             message.channel.send("Random Anime Suggestion:"+data.data.Media.title.romaji+"\n"+data.data.Media.siteUrl)
             console.log(data);
         }
    }

    function handleError(error) {
        console.log(error);

    }
    function handleErrorRandom(error) {
        console.log(error);
        randomAnime();
    }
