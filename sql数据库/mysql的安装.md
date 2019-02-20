## 相关资料
https://blog.csdn.net/dadan1314/article/details/80593878
## window
1,创建mysql根目录下的my.ini文本文件
```ini
[mysqld]
basedir=[mysql目录]
datadir=[data目录]
```
2,
```bash
// 以管理员身份打开CMD
// 切换到mysql的bin目录
>> cd [mysql的bin目录]
// 初始化(确保data目录为空目录)
>> mysqld --defaults-file=[my.ini全路径] --initialize --console
```
会产生一个随机密码

3,
```bash
// 连接mysql
>> mysql -u root -p
```

4, 修改密码
```
// 增加或者修改原生密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
```