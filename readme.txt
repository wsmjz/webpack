1.首先在仓库中创建隐藏文件“.gitignore”,选中本地仓库，右击“Git Bash Here”,然后执行如下命令：

touch .gitignore

2.用文本编辑器如editplus或notepad++输入需要忽略的文件或文件名，如下所示：

##ignore this file##
/target/ 

.classpath
.project
.settings      
 ##filter databfile、sln file##
*.mdb  
*.ldb  
*.sln    
##class file##
*.com  
*.class  
*.dll  
*.exe  
*.o  
*.so  
# compression file
*.7z  
*.dmg  
*.gz  
*.iso  
*.jar  
*.rar  
*.tar  
*.zip  
*.via
*.tmp
*.err 
# OS generated files #  
.DS_Store  
.DS_Store?  
._*  
.Spotlight-V100  
.Trashes  
Icon?  
ehthumbs.db  
Thumbs.db  



备注：

/target/ ：过滤文件设置，表示过滤这个文件夹

*.mdb  ，*.ldb  ，*.sln 表示过滤某种类型的文件
/mtk/do.c ，/mtk/if.h  表示指定过滤某个文件下具体文件
 !*.c , !/dir/subdir/     !开头表示不过滤
 *.[oa]    支持通配符：过滤repo中所有以.o或者.a为扩展名的文件

该方法保证任何人都提交不了这类文件
然后，进行如下操作：

1.cd 切换到工程目录



2.Git全局设置

git config --globaluser.name "user.name"

git config --global user.email "user.email" //如果已经设定过则可以跳过这步



3.git init //初始化一个git 仓库



4. touch README.md  //创建帮助文件



5. 
git add -A //添加所有文件



6. 
git commit -a -m  "注释内容” //添加注释



7. git remote add origin https://git.oschina.net/username/xxx.git(你的远程仓库地址，即是码云的项目地址)     //和远程仓库进行关联



8. 
git push origin master //上传仓库到码云



顺带记录一些常用的git指令：

git clone url(项目仓库地址) //克隆一个远程仓库，就是在本地建立一个新的项目。

git pull origin master //如果已经有一个项目，通过这条指令可以直接更新该项目

提交修改的项目，步骤如下：

git status 

git add -A

git commit -a -m "填写修改的内容"

git push origin master

git init

git add .

git commit -m 'first_commit'

git remote add origin git@gitee.com:xueyise/webpack-gulp-demo.git https://github.com/xueyise/webpackgulp.git git remote rm origin

git push -u origin master

git pull origin master

git add -A .
 git status 
git commit -m "for test" 
git push -u origin master