class EnemyCreate{
    constructor(x, y, spriteName, configs){
        this.configs = configs;

        this.sprite = Nakama.enemyGroup.create(
            x,
            y,
            'assets',
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = configs.hp;

        this.velox = 300;
        this.veloy = 200;
        //this.sprite.body.velocity.x = this.velox;
        //this.sprite.body.velocity.y = this.veloy;
    }

    update(){
        if(this.sprite.position.x <= 50){
            do{
                this.sprite.body.velocity.x = this.velox;
            }while(this.sprite.position.x >=590)
        }
        if(this.sprite.position.x >= 590){
            do{
                this.sprite.body.velocity.x = -this.velox;
            }while(this.sprite.position.x <= 50)
        }

        if(this.sprite.position.y <= 50){
            do{
                this.sprite.body.velocity.y = this.veloy;
            }while(this.sprite.position.y >=480)
        }
        if(this.sprite.position.y >= 480){
            do{
                this.sprite.body.velocity.y = -this.veloy;
            }while(this.sprite.position.y <= 50)
        }
    }
}
