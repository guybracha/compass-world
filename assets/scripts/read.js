document.getElementById('infl').addEventListener('change',function(){
    var file_reader=new FileReader();
    file_reader.onload=function(){
        document.getElementById('res').textContent=file_reader.result;
    }
    file_reader.readAsText(this.files[0]);
})