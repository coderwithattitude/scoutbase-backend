import { getUserId } from '../utils';
import { userInfo } from 'os';
async function movies(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter},
            { url_contains: args.filter },
        ],
    } : {}

    const Movies = await context.prisma.movies({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    })
    const user = await getUserId(context)

    return Movies(movie => { user ? {
        ...movie,
        scoutbase_rating: getRating(5, 9)
    } : {
        ...movie
    }});


}

function getRating(x,y) {
    return (Math.random() * (x - y + 1) + x).toFixed(1);
}