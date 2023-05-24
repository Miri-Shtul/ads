import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(async function () {
    const id = wixLocation.query.id;
    //const filter = wixData.filter().eq('userid', id);
	 
    $w('#posts').onItemReady(($item, itemData, index) => {
        $item('#postImage').src = itemData.image;
        $item('#likesCount').text = itemData.likes;
    });
    const query = wixData.query('posts')
        .eq('userId', id);
    const { items: posts } = await query.find();
	//console.log('items',items)
});