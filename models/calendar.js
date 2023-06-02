const { db } = require("./db");

const getConsumptionHistoryByDate = async(userID) => {
    let sql =
    `SELECT ch.cHistoryID, f.user1ID userID, f.user2ID writerID,
    u.nickname writerNickname, u.profile writerProfile,
    ch.amount, ch.content, ch.category, ch.date 
    FROM consumptionHistory ch, friend f, user u 
    WHERE f.user1ID = ${userID} AND f.user2ID = ch.userID
    AND f.accepted = 0 AND secret = 0 AND u.userID = f.user2ID 
    ORDER BY ch.date DESC`;
    let [rows, fields] = await db.query(sql);
    return rows;
};


const getCountOfComment = async(cHistoryID) => {
    let sql = `SELECT commentID, userID, content, date
    FROM comment c
    WHERE c.cHistoryID = ${cHistoryID}`
    let [rows] = await db.query(sql);
    return rows;
}

const getCommentByHistoryID = async(cHistoryID) => {
    let sql = `SELECT commentID, userID, content, date
    FROM comment c
    WHERE c.cHistoryID = ${cHistoryID}`
    let [rows] = await db.query(sql);
    return rows;
}

const getCountOfEmoticon = async(cHistoryID) => {
    let sql = `SELECT count(*) count FROM emoticon e
    WHERE e.cHistoryID = ${cHistoryID} AND e.category = 0;`
    let [rows] = await db.query(sql);
    const positiveEmoticonCount = rows[0].count;

    sql = `SELECT count(*) count FROM emoticon e
    WHERE e.cHistoryID = ${cHistoryID} AND e.category = 1;`
    [rows] = await db.query(sql);
    const negativeEmoticonCount = rows[0].count;

    return {
        positiveEmoticonCount,
        negativeEmoticonCount
    }
}

const getEmoticonByHistoryID = async(cHistoryID) => {
    let sql = `SELECT emoticonID, userID, category
    FROM emoticon e
    WHERE e.cHistoryID = ${cHistoryID}`
    let [rows] = await db.query(sql);
    return rows;
}

const getTotalConsumptionAmount = async() => {
    let sql = `SELECT SUM(amount)
    FROM consumptionHistory ch`
    let [rows, fields] = await db.query(sql);
    return rows;
}

module.exports = {
    getConsumptionHistoryByDate,
    getCountOfComment,
    getCommentByHistoryID,
    getCountOfEmoticon,
    getEmoticonByHistoryID,
    getTotalConsumptionAmount
}