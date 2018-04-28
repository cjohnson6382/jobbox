
**switch the project over to another git repo**
git remote add origin https://github.com/cjohnson6382/jobbox.git
git push -u origin master


**configure firebase cloud storage to use CORS so that clients can fetch PDFs directly**
<!--google article on this issue-->
https://cloud.google.com/storage/docs/configuring-cors

<!--get current cors config-->
gsutil cors get gs://jobbox-cd46c.appspot.com
<!--set cors with json-->
gsutil cors set cors-json-file.json gs://jobbox-cd46c.appspot.com

cors-json-file.json is in the project root
