const btn = document.querySelector('#choose');
        const sb = document.querySelector('#framework')
        btn.onclick = (event) => {
            event.preventDefault();
            // show the selected index
            alert(sb.selectedIndex);
        };