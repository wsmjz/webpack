1.�����ڲֿ��д��������ļ���.gitignore��,ѡ�б��زֿ⣬�һ���Git Bash Here��,Ȼ��ִ���������

touch .gitignore

2.���ı��༭����editplus��notepad++������Ҫ���Ե��ļ����ļ�����������ʾ��

##ignore this file##
/target/ 

.classpath
.project
.settings      
 ##filter databfile��sln file##
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



��ע��

/target/ �������ļ����ã���ʾ��������ļ���

*.mdb  ��*.ldb  ��*.sln ��ʾ����ĳ�����͵��ļ�
/mtk/do.c ��/mtk/if.h  ��ʾָ������ĳ���ļ��¾����ļ�
 !*.c , !/dir/subdir/     !��ͷ��ʾ������
 *.[oa]    ֧��ͨ���������repo��������.o����.aΪ��չ�����ļ�

�÷�����֤�κ��˶��ύ���������ļ�
Ȼ�󣬽������²�����

1.cd �л�������Ŀ¼



2.Gitȫ������

git config --globaluser.name "user.name"

git config --global user.email "user.email" //����Ѿ��趨������������ⲽ



3.git init //��ʼ��һ��git �ֿ�



4. touch README.md  //���������ļ�



5. 
git add -A //��������ļ�



6. 
git commit -a -m  "ע�����ݡ� //���ע��



7. git remote add origin https://git.oschina.net/username/xxx.git(���Զ�ֿ̲��ַ���������Ƶ���Ŀ��ַ)     //��Զ�ֿ̲���й���



8. 
git push origin master //�ϴ��ֿ⵽����



˳����¼һЩ���õ�gitָ�

git clone url(��Ŀ�ֿ��ַ) //��¡һ��Զ�ֿ̲⣬�����ڱ��ؽ���һ���µ���Ŀ��

git pull origin master //����Ѿ���һ����Ŀ��ͨ������ָ�����ֱ�Ӹ��¸���Ŀ

�ύ�޸ĵ���Ŀ���������£�

git status 

git add -A

git commit -a -m "��д�޸ĵ�����"

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