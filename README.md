# 個人行事曆
## 功能
* 使用者可以新增專屬的行事曆
* 使用者可以瀏覽行事曆的詳細資訊
* 使用者可以在詳細資訊中(瀏覽、新增、修改、刪除)待辦事項
* 使用者可以修改行事曆的資訊
* 使用者可以刪除行事曆的內容
* 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
* 使用者也可以透過 Facebook 或 Google 直接登入

## 環境建置
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
* [express-session](https://www.npmjs.com/package/express-session#resave)
* [Mongoose](https://mongoosejs.com/)
* [bcryptjs](https://www.npmjs.com/package/bcrypt)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [method-override](https://www.npmjs.com/package/method-override)
* [passport](https://www.npmjs.com/package/passport)
* [passport-facebook](http://www.passportjs.org/packages/passport-facebook/)
* [passport-google](http://www.passportjs.org/packages/passport-google/)
* [passport-google-oauth20](http://www.passportjs.org/packages/passport-google-oauth20/)
* [passport-local](http://www.passportjs.org/packages/passport-local/)
* [connect-flash](https://www.npmjs.com/package/connect-flash)
* [dayjs](https://www.npmjs.com/package/dayjs)

## 專案安裝
### Clone
```
git clone https://github.com/AC-Galen/schedule.git
cd schedule
npm install
```

### 環境變數設定
```
.env.example 移除.example副檔名
修改 MONGODB_URI、FACEBOOK_ID、FACEBOOK_SECRET、GOOGLE_ID、GOOGLE_SECRET
```

### 執行專案
```
npm run dev
```
若成功開啟伺服器你會看到：
```
App is running on http://localhost:3000
```
可以至 http://localhost:3000 查看網站

### 建立種子資料
```
npm run seed
```
### 種子資料的資訊如下
```
{
  "name": "友人A",
  "email": "root1@example.com",
  "password": "12345678"
}
{
  "name": "友人B",
  "email": "root2@example.com",
  "password": "12345678"
}
```



### 此專案有部屬至heroku，但到2022年11月28日便會被消除
```
https://agile-temple-15484.herokuapp.com/users/login
```
