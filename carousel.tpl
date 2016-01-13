<div class="carousel-container" id="carousel-container">
    <div class="carousel-wrapper clearfix" style="width: {%($carousel|@count)*100%}%">
        {%foreach $carousel as $item%}
            <a href="{%$item.url|escape:none%}" target="_blank"
                    class="item"
                 style="background-image: url({%$item.img|escape:none%});width: {%100/($carousel|@count)%}%">
                <div class="i"></div>
                <div class="w1100 io clearfix">
                    <div class="title">{%$item.title%}</div>
                    <div class="intro">{%$item.intro%}</div>
                </div>
            </a>
        {%/foreach%}
    </div>

    <div class="w1100 arr-wrapper">
        <span class="arr arr-left"></span>
        <span class="arr arr-right"></span>
    </div>

    <div class="carousel-nav w1100">
        {%foreach $carousel as $item%}<span{%if $item@first%} class="current"{%/if%}></span>{%/foreach%}
    </div>

    <div class="de"></div>
</div>