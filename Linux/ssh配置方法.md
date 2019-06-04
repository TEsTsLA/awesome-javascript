## 修改当前修改用户密码
```bash
$ sudo passwd username
```
## 修改root用户密码
```bash
$ sudo passwd root
```
## 修改SSH配置文件

```bash
$ sudo vi /etc/ssh/sshd_config
PermitRootLogin yes
PasswordAuthentication yes 
PubkeyAuthentication yes
:wq!
``` 
>这里最重要的是我们要把 PubkeyAuthentication 配置为 yes 允许使用基于密钥认证的方式登录。

## 重启ssh

    service sshd restart

原文：https://blog.csdn.net/tangxin168/article/details/84929189 

## 连接
使用默认的ssh秘钥对连接：ssh username@host -p port
指定秘钥对的ssh连接 ： ssh -i parivate-rsa-path username@host -p port