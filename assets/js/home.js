function openNav(){
    document.getElementById("navOverlay").styyle.display="block";
}
//close menu when clicking "x"
function closeNav(){
    document.getElementById("navOverlay").style.display="none";
}
//toggle the country sub-menu dropdown
function toggleDropdown(){
    var dropdown=document.getElementById("navOverlay").style.display ="none";
    if (dropdown.style.display==="block"){
        dropdown.style.display="none";
    }else{
        dropdown.style.display="block";
    }
}