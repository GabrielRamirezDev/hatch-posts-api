import fetch from 'node-fetch'
import express from 'express';

const app = express();


const ascendingSort = (data) => {
    data.sort((a,b) => {a - b})
}
const descendingSort = () => {
    data.sort((a,b) => {b - a})
}

app.get('/api/ping/:tag', async (req, res) => {
    let tag = req.params.tag;
    if(!tag)return res.status(400).send('Tags parameter is required');
    try{
        const response = await fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, {
            method: 'GET',
        })
        if(response.ok){
            const data = await response.json();
            res.send(data);
        } else{
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }catch(error){
        throw new Error(error)
    }
    //if(!data) return res.status(404).send('Data was not found. Please try again later');
})

app.get('/api/posts/:tags/:sortBy?/:direction?', async (req, res) => {
    //establish parameters
    let tags = req.params.tags;
    let sortBy = req.params.sortBy;
    let direction = req.params.direction
    
    console.log('tags',tags);

    //check if parameters are valid
    let sortByFields = ['id', 'reads', 'likes', 'popularity'];
    let directionFields = ['asc', 'desc'];

    if(!tags)return res.status(400).send('Tags parameter is required');
    // if(sortBy && !sortByFields.includes(sortBy)) return res.status(400).send('sortBy parameter is invalid"');
    // if(direction && !directionFields.includes(direction)) return res.status(400).send('direction parameter is invalid"');

    //call api for each tag
    if(tags.includes(',')) tags = tags.split(',');
    console.log('tags2',tags);
    tags.forEach(tag => {
        try{
            console.log('tags3',tag);
            const response = fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, {
                method: 'GET',
            })
            if(response.ok){
                const data = response.json();

                // if(sortBy && sortBy === 'id'){

                //     if(!direction || direction === 'asc'){
                //         ascendingSort(data.posts.id);
                //     } else{
                //         descendingSort(data.posts.id)
                //     }
                // }
                // if(sortBy && sortBy === 'likes'){
                //     if(!direction || direction === 'asc'){
                //         ascendingSort(data.posts.likes);
                //     } else{
                //         descendingSort(data.posts.likes)
                //     }
                // }
                // if(sortBy && sortBy === 'reads'){
                //     if(!direction || direction === 'asc'){
                //         ascendingSort(data.posts.reads);
                //     } else{
                //         descendingSort(data.posts.reads)
                //     }
                // }
                // if(sortBy && sortBy === 'popularity'){
                //     if(!direction || direction === 'asc'){
                //         ascendingSort(data.posts.popularity);
                //     } else{
                //         descendingSort(data.posts.popularity)
                //     }
                // }

                res.send(data);

            } else{
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        }catch(error){
            throw new Error(error)
        }
    })



    //if(!data) return res.status(404).send('Data was not found. Please try again later');
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));