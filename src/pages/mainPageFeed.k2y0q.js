import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const use = await currentMember.getMember();
    //let userId = use._id;
	let userId= "c58d9ecb-6aa4-4b39-a0b8-5c14cc342794";
    console.log(use)
    let user, fullName;
    await wixData.query('users')
        .eq('_owner', userId)
        .find()
        .then(results => {
            user = results.items[0];
            console.log('result', results)
            console.log('user', user)
            fullName = user.fullName
        })
        .catch(err => {
            console.log(err);
        });
    $w('#name').text = fullName;
    let followers, following;

    await wixData.query('followers')
        .eq('followerId', userId).find()
        .then(res => {
            followers = res.items.length;
        })
        .catch(err => { console.log(err) })
    await wixData.query('following')
        .eq('followerId', userId).find()
        .then(res => {
            following = res.items.length;
        })
        .catch(err => { console.log(err) })
    $w('#followersNum').text = String(followers);
    $w('#followingNum').text = String(following);

    $w('#myPosts').onClick(() => {
		wixLocation.to('https://miri176726.editorx.io/formdata/myposts?id='+ userId)
    })
});